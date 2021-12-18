import { Router } from "express";
import service from "../services/auth.service";

const router = Router();

// router.post("/register", async (req, res) => {
//     if (!req.body.username || !req.body.password) {
//         res.sendStatus(400);
//     } else {
//         try {
//             const uid = await service.register(req.body.username, req.body.password);
//             res.json(uid);
//         } catch (err) {
//             res.sendStatus(500);
//         }
//     }
// });

export default router;
