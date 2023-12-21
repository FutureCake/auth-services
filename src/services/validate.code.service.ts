import { RowDataPacket } from "mysql2";
import connectMYSQL from "../utils/db.utils";
import { ServiceResult } from "./email.auth.service";

interface QueryResult extends RowDataPacket {
    'access-code': string;
}

async function codeValidatorService(email: string, code: string): Promise<ServiceResult<boolean>> {
    const db = connectMYSQL();
    const conn = await db.getConnection();

    const [rows] = await conn.query<QueryResult[]>("SELECT `access-code` from users where email = ?", [email]);
    
    console.log(rows[0]);

    if(rows.length > 0) {
        if (rows[0]['access-code'] === code) {
            return {
                message: "code validated successfully",
                data: true
            }
        }
    }

    return {
        message: "failed to validate code",
        data: false
    }
}

export default codeValidatorService;