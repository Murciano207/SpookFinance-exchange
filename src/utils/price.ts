const ENDPOINT_PRICE_USD = 'https://mirror.yogi.fi/prices';

export async function getPrices(assets: string[]): Promise<Record<string, number>> {
    const url = `${ENDPOINT_PRICE_USD}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
