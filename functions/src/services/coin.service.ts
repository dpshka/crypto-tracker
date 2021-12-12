import axios from "axios";
import config from "../config";
import { transformResponse } from "../helpers";
import { IAsset } from "../models/coin.model";

const coinApiUrl = "https://rest.coinapi.io";
const coinApiIconUrl = "https://s3.eu-central-1.amazonaws.com/bbxt-static-icons/type-id/png_512";
const headers = {
    "X-CoinAPI-Key": config.coinApiKey as string,
};

async function getAssets(bookmarks?: string[]) {
    const params = bookmarks ? { filter_asset_id: bookmarks.join(";") } : undefined;

    const { data } = await axios.get<IAsset[]>(`${coinApiUrl}/v1/assets`, {
        params,
        headers,
        transformResponse,
    });

    // Assign icon URL to each asset.
    const assets = data.map((asset) => {
        if (asset.id_icon) {
            asset.icon = `${coinApiIconUrl}/${asset.id_icon.replace(/-/g, "")}.png`;
        }
        return asset;
    });

    return assets;
}

export default { getAssets };
