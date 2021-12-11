import { Router } from "express";
import service from "../services/user.service";

const router = Router();

router.get("/", async (req, res) => {
    try {
        return res.json(await service.get());
    } catch (err) {
        // Do something...
    }

    return res.sendStatus(404);
});

export default router;
