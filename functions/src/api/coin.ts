import { Router } from "express";
import axios from "axios";
import service from "../services/coin.service";

const router = Router();

router.get("/assets", async (req, res) => {
    try {
        const assets = await service.getAssets();
        const filtered = assets
            .filter((asset) => asset.type_is_crypto)
            .sort((a, b) => b.volume_1mth_usd - a.volume_1mth_usd)
            .slice(0, 100);

        res.json(filtered);
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

router.get("/rates/:assetId", async (req, res) => {
    try {
        res.json(await service.getExchangeRates(req.params.assetId));
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

export default router;
