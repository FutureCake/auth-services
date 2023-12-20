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
    const [rows] = await db.query<UserResult[]>("SELECT * FROM users WHERE email = ?", [email]);
    
    if(rows.length === 0) {
        throw new ServiceError("user does not exist");
    }

    emailConfirmCode(email, {
        type: "numeric",
        length: 5,
        template: "{{code}}",
        subject: "myca login code",
        sender: "noreply@myca.com"
    }, (err, inf) => {
        throw new ServiceError("failed to send confirmation code email");
    });

    return {
        message: "send confirmation email",
        data: email
    }
}

export { emailLoginService };
