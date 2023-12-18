import connectMYSQL from "../utils/db.utils";

async function loginService(email: string) {
    const db = connectMYSQL();
    const [rows, fields] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    console.log(rows, fields);
}

export { loginService };
