interface IAsset {
    asset_id: string;
    name: string;
    volume_1hrs_usd: number;
    volume_1day_usd: number;
    volume_1mth_usd: number;
    price_usd: number;
    icon?: string;
}

export { IAsset };
