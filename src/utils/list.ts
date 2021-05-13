import tokenlist from 'yogi-assets/generated/listed.tokenlist.json';

import config, { AssetMetadata } from '@/config';

const NATIVE_LOGO = `https://raw.githubusercontent.com/yogi-fi/yogi-assets/master/assets/${config.chainId}/native.png`;

export interface TokenList {
    name: string;
    logoURI?: string;
    tokens: Token[];
}

interface Token {
    address: string;
    chainId: number;
    name: string;
    symbol: string;
    decimals: number;
    logoURI?: string;
}

export const DEFAULT_LIST = 'yogi';

export const listMetadata: Record<string, string> = {
    [DEFAULT_LIST]: '',
};

export async function getTokenlist(id: string): Promise<TokenList> {
    if (id === DEFAULT_LIST) {
        return tokenlist;
    }
    const listUrl = listMetadata[id];
    const response = await fetch(listUrl);
    const json = await response.json();
    return json;
}

export function getAssetsFromTokenlist(chainId: number, list: TokenList): Record<string, AssetMetadata> {
    const assets: Record<string, AssetMetadata> = {};
    if (list.tokens.findIndex(token => token.address === config.addresses.wnative) !== -1) {
        assets[config.native] = {
            address: config.native,
            name: config.native.toUpperCase(),
            symbol: config.native.toUpperCase(),
            decimals: 18,
            logoURI: NATIVE_LOGO,
        };
    }
    for (const token of list.tokens) {
        if (token.chainId !== chainId) {
            continue;
        }
        assets[token.address] = {
            address: token.address,
            name: token.name,
            symbol: token.symbol,
            decimals: token.decimals,
            logoURI: token.logoURI,
        };
    }
    return assets;
}
