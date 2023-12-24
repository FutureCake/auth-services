import { RowDataPacket } from "mysql2";
import connectMYSQL from "../utils/db.utils";
import GenerateJWT, { getDefaultJWTSignParams } from "../utils/jwt.utils";
import { ServiceResult } from "./email.auth.service";

interface QueryResult extends RowDataPacket {
    'access-code': string;
    id: number;
}

async function codeValidatorService(email: string, code: string): Promise<ServiceResult<string>> {
    const db = connectMYSQL();
    const conn = await db.getConnection();

    const [rows] = await conn.query<QueryResult[]>("SELECT `id`, `access-code` from users where email = ?", [email]);

    if (rows.length > 0) {
        if (rows[0]['access-code'] === code) {

            const jwt = GenerateJWT(
                getDefaultJWTSignParams(false),
                {user: rows[0].id}
            )

            return {
                message: "code validated successfully",
                data: jwt
            }
        }
    }

    return {
        message: "failed to validate code",
    }
}

export default codeValidatorService;