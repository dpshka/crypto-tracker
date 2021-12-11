import { Router } from "express";
import auth from "./api/auth";
import user from "./api/user";
import verifyToken from "./middleware/token.middleware";

const router = Router();

router.use("/auth", auth);
router.use("/user", [verifyToken, user]);

export default router;
