import { NextFunction, Request, Response } from "express";
import service from "../services/auth.service";

export default async function (req: Request, res: Response, next: NextFunction) {
    try {
        await service.verifyToken(req.token);
        next();
    } catch (err) {
        res.status(401).json({ message: "No token provided" });
    }
}
