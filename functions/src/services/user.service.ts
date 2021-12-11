import { IUser } from "../models/user.model";

async function get(): Promise<IUser> {
    return {
        username: "stefan",
        password: "Test123",
        bookmarks: ["BTC", "ETH", "DFI", "AUDIO"],
    };
}

export default { get };
