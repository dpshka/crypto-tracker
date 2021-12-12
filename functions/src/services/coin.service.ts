import axios from "axios";
import config from "../config";
import { transformResponse } from "../helpers";
import { IAsset, IExchangeRate } from "../models/coin.model";
import FirestoreService from "./firestore";

const firestore = new FirestoreService<IAsset>("assets");
const coinApiUrl = "https://rest.coinapi.io";
const coinApiIconUrl = "https://s3.eu-central-1.amazonaws.com/bbxt-static-icons/type-id/png_512";
const headers = {
    "X-CoinAPI-Key": config.coinApiKey as string,
};

async function getAssets(bookmarks?: string[]) {
    const params = bookmarks ? { filter_asset_id: bookmarks.join(";") } : undefined;

    let assets = await getAll();

    // Fetch assets from API if none stored to save request quota :P
    // TODO: Fetch assets if stored assets are older than x hours/days.
    if (assets.length === 0) {
        const { data } = await axios.get<IAsset[]>(`${coinApiUrl}/v1/assets`, {
            params,
            headers,
            transformResponse,
        });

        // Assign icon URL to each asset.
        assets = data.map((asset) => {
            if (asset.id_icon) {
                asset.icon = `${coinApiIconUrl}/${asset.id_icon.replace(/-/g, "")}.png`;
            }
            return asset;
        });

        await firestore.createAll(assets);
    }

    return assets;
}

async function getExchangeRates(assetId: string) {
    const { data } = await axios.get<{ asset_id_base: string; rates: IExchangeRate[] }>(
        `${coinApiUrl}/v1/exchangerate/${assetId}`,
        { headers, transformResponse },
    );

    return data.rates;
}

async function getAll() {
    const assets = [];
    const docs = await firestore.getAll();

    for (const doc of docs) {
        assets.push(doc.data() as IAsset);
    }

    return assets;
}

export default { getAssets, getExchangeRates };
