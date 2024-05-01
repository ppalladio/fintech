import { ExpoRequest, ExpoResponse } from 'expo-router/server';
const API_KEY = process.env.CMC_API_KEY;
export async function GET(req: ExpoRequest) {
    const ids = req.expoUrl.searchParams.get('ids');
    const response = await fetch(
        `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?id=${ids}`,
        {
            headers: {
                'X-CMC_PRO_API_KEY': API_KEY!,
            },
        },
    );
    const res = await response.json();
	// console.log(res)
    return ExpoResponse.json(res.data);
}
