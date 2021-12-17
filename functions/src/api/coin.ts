import { Router } from "express";
import axios from "axios";
import service from "../services/coin.service";

const router = Router();

router.get("/assets", async (req, res) => {
    try {
        const assets = await service.getAssets();

        if (assets.length > 0) {
            res.json(assets);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const status = err.response?.status;
            if (status === 400 || status === 401) {
                res.sendStatus(err.response?.status!);
            } else if (status === 403 || status === 429) {
                res.status(404).json({ message: "Requested resource(s) found" });
            } else {
                res.sendStatus(500);
            }
        } else {
            res.sendStatus(500);
        }
    }
});

// router.get("/rates/:assetId", async (req, res) => {
//     try {
//         res.json(await service.getExchangeRates(req.params.assetId));
//     } catch (err) {
//         if (axios.isAxiosError(err)) {
//             const status = err.response?.status;
//             if (status === 400 || status === 401) {
//                 res.sendStatus(err.response?.status!);
//             } else if (status === 403 || status === 429) {
//                 res.status(404).json({ message: "Requested resource(s) found" });
//             } else {
//                 res.sendStatus(500);
//             }
//         } else {
//             res.sendStatus(500);
//         }
//     }
// });

export default router;
