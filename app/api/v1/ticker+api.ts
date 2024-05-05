import { ExpoRequest, ExpoResponse } from 'expo-router/server';
const API_KEY = process.env.CMC_API_KEY;
export async function GET(req: ExpoRequest) {
    // console.log('search params: ', req.expoUrl.searchParams);
	// console.log(req.expoUrl.searchParams.get('id'))
    const coin_id = req.expoUrl.searchParams.get('id');
	// console.log("coin_id",coin_id)
    try {
        const response = await fetch(
            `https://api.coinpaprika.com/v1/tickers/btc-bitcoin/historical?start=2024-01-01&interval=1d`,
        );



        const data = await response.json(); // Attempt to parse as JSON
// console.log("data",data)

        return ExpoResponse.json(data);
    } catch (error) {
        console.error('Error fetching or parsing data:', error);
        return ExpoResponse.json({ error: 'Data could not be retrieved' });
    }
}
