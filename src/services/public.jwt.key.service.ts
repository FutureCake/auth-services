import config from "../configs/configurator";

function getPublicJWTKey(): string {
    return config.get("authentication.jwtToken.public");
}

export default getPublicJWTKey;