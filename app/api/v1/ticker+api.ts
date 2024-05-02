import { ExpoRequest, ExpoResponse } from 'expo-router/server';
const API_KEY = process.env.CMC_API_KEY;
export async function Get(req: ExpoRequest) {
    const response = await fetch(
        `https://api.coinpaprika.com/v1/tickers/{coin_id}/historical?start=2023-01-01&interval=1d`,
    );
    const res = await response.json();
    return ExpoResponse.json(res.data);
}
