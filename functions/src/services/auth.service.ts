import { auth } from "firebase-admin";

async function verifyToken(token?: string) {
    if (token) {
        const decoded = await auth().verifyIdToken(token);

        return decoded.uid;
    }

    return Promise.reject();
}

async function register(email: string, password: string) {
    const user = await auth().createUser({
        email,
        password,
        displayName: "Crypto User",
        emailVerified: true,
        disabled: false,
    });

    return user.uid;
}

export default { verifyToken, register };
