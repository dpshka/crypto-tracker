interface IAsset {
    asset_id: string;
    name: string;
    type_is_crypto: boolean;
    data_quote_start: Date;
    data_quote_end: Date;
    data_orderbook_start: Date;
    data_orderbook_end: Date;
    data_trade_start: Date;
    data_trade_end: Date;
    data_symbols_count: number;
    data_start: Date;
    data_end: Date;
    volume_1hrs_usd: number;
    volume_1day_usd: number;
    volume_1mth_usd: number;
    id_icon?: string;
    icon?: string;
}

export { IAsset };
