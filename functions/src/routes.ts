import { Router } from "express";
import auth from "./api/auth";
import coin from "./api/coin";

import verifyToken from "./middleware/token.middleware";

const router = Router();

router.use("/auth", auth);
router.use("/coin", [verifyToken, coin]);

export default router;
