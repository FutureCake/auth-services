import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import config from "../configs/configurator";
import { CodeOptions, generateCode } from "./functions.utils";

type ConfirmationCodeOptions = CodeOptions & {
    template?: string;
}

let email: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

function connectEmail() {
    if (!email) {
        try {
            email = nodemailer.createTransport({
                host: config.get("email.host"),
                port: config.get("email.port"),
                auth: {
                    user: config.get("email.user"),
                    pass: config.get("email.pass"),
                }
            });
        } catch (error) {
            console.log("failed to create email transport service ", error);
            process.exitCode = 3;
        }
    }

    return email;
};

async function emailConfirmCode(recipient: string, options?: ConfirmationCodeOptions): Promise<void> {

    let code = options?.code;

    if (!options?.code) {
        code = generateCode(options);
    }

    email.sendMail({
        to: recipient,
        from: MYCA_MAIL,
        subject: CONFIRMATION_CODE_SUBJ,
        html: `<div style="width: 200px; height: 200px; background-color: aquamarine; color: black;">${code}</div>`
    }, (err, inf) => {
        if (err || inf.rejected.length > 0) {
            on_fail?.({
                msg: `failed to send confirmation mail to ${recipient}`,
                error: err,
                information: inf
            });
        }
    });

}



export default connectEmail;
export { emailConfirmCode };
export type { ConfirmationCodeOptions };

