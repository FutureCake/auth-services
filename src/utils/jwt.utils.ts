import { SignOptions, sign } from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import config from "../configs/configurator";

type JWTData = { [key: string]: any };

function getDefaultJWTSignParams(isRefresh: boolean): SignOptions {
    return {
        algorithm: "RS256",
        expiresIn: (isRefresh) ? "365d" : "24h",
        issuer: "api.myca.com",
        jwtid: uuid(),
        mutatePayload: false,
        audience: "myca.mobile",
        subject: "refresh"
    }
}

function GenerateJWT(options: SignOptions, data: JWTData): string {
    return sign(
        data,
        config.get("authentication.jwtToken.private"),
        options
    );
}

export default GenerateJWT;
export { getDefaultJWTSignParams };
