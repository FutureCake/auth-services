import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import config from "../configs/configurator";
import { CodeOptions, generateCode } from "./functions.utils";


type emailErrorCallback = (err: Error | null, info: SMTPTransport.SentMessageInfo) => void;

type ConfirmationCodeOptions = CodeOptions & {
    template: string;
    subject: string;
    sender: string;
}

interface CodeReturn {
    code: string;
    email: string;
}

let transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

function connectEmail(options?: SMTPTransport.Options) {
    if (!transporter) {
        try {
            transporter = nodemailer.createTransport({
                host: config.get("email.host"),
                port: config.get("email.port"),
                auth: {
                    user: config.get("email.user"),
                    pass: config.get("email.pass"),
                },
                ...options
            });
        } catch (error) {
            console.log("failed to create email transport service ", error);
            process.exitCode = 3;
        }
    }

    return transporter;
};

async function emailConfirmCode(recipient: string, options: ConfirmationCodeOptions, errorCallback?: emailErrorCallback): Promise<CodeReturn> {

    let code = options.code;

    if (options.code === undefined || options.code === null) {
        code = generateCode(options);
    }

    connectEmail();
    transporter.sendMail({
        to: recipient,
        from: options.sender,
        subject: options.subject,
        html: renderTemplate(options.template, { code: code as string }),
    }, (err, inf) => {
        if (errorCallback) errorCallback(err, inf);
    });

    return {
        code: code as string,
        email: recipient
    }
}

function renderTemplate(template: string, data?: { [key: string]: string; }): string {
    if (!data) return template;

    for (const key in data) {
        const value = data[key];

        template = template.replaceAll(`{{${key}}}`, value);
    }

    return template;
}



export default connectEmail;
export { emailConfirmCode, renderTemplate };
export type { CodeReturn, ConfirmationCodeOptions, emailErrorCallback };

