import { ExpoRequest, ExpoResponse } from 'expo-router/server';
const API_KEY = process.env.CMC_API_KEY;
export async function GET(req: ExpoRequest) {
    const limit = req.expoUrl.searchParams.get('limit') ?? 5;
    const response = await fetch(
        `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=${limit}&convert=EUR`,
        {
            headers: {
                'X-CMC_PRO_API_KEY': API_KEY!,
            },
        },
    );
    const res = await response.json();
    return ExpoResponse.json(res.data);
}
