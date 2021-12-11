import { sign, verify, JwtPayload } from "jsonwebtoken";
import config from "../config";

function generateToken(code: string, accessToken: string) {
    return sign({ code, accessToken }, config.tokenSecret as string, { expiresIn: "1800s" });
}

function verifyToken(token?: string) {
    return new Promise<JwtPayload>((resolve, reject) => {
        if (!token) {
            reject();
        } else {
            verify(token, config.tokenSecret as string, (err, payload) =>
                err ? reject() : resolve(payload as JwtPayload),
            );
        }
    });
}

export default { generateToken, verifyToken };
