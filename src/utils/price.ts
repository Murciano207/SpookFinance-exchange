const ENDPOINT_PRICE_USD = 'https://mirror.yogi.finance/prices';

export async function getPrices(assets: string[]): Promise<Record<string, number>> {
    const url = `${ENDPOINT_PRICE_USD}`;
    const response = await fetch(url);
    const data = await response.json();
    
    // TODO: filter / cache prices?
    const prices = Object.fromEntries(Object.entries(data).map((k,v) => {
        return [k, v];
    }));
    return prices;
}
