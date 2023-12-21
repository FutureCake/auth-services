import { RowDataPacket } from "mysql2";
import connectMYSQL from "../utils/db.utils";
import { emailConfirmCode } from "../utils/email.utils";
import { ServiceError } from "../utils/error.utils";

interface ServiceResult<T = unknown> {
    message: string;
    data?: T
}

interface UserResult extends RowDataPacket {
    email: string;
    id: number;
}

async function emailLoginService(email: string): Promise<ServiceResult<string>> {

    const db = connectMYSQL();
    const conn = await db.getConnection();

    const [rows] = await conn.query<UserResult[]>("SELECT * FROM users WHERE email = ?", [email]);
    
    if(rows.length === 0) {
        throw new ServiceError("user does not exist");
    }

    const code = await emailConfirmCode(email, {
        type: "numeric",
        length: 5,
        template: "{{code}}",
        subject: "myca login code",
        sender: "noreply@myca.com"
    }, (err, inf) => {
        throw new ServiceError("failed to send confirmation code email");
    });

    conn.execute("UPDATE users SET `access-code` = ? WHERE email = ?", [code.code, code.email]);

    db.releaseConnection(conn);

    return {
        message: "send confirmation email",
        data: email
    }
}

export { emailLoginService };
export type { ServiceResult };

