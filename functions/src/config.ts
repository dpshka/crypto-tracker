import dotenv from "dotenv";

dotenv.config();

export default {
    env: process.env.NODE_ENV,
    tokenSecret: process.env.TOKEN_SECRET,
    gac: process.env.GOOGLE_APPLICATION_CREDENTIALS,
};
