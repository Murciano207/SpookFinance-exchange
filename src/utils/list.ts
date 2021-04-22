import tokenlist from 'yogi-assets/generated/listed.tokenlist.json';

import config, { AssetMetadata } from '@/config';

const BNB_LOGO = 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/info/logo.png';

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
    if (list.tokens.findIndex(token => token.address === config.addresses.wbnb) !== -1) {
        assets.bnb = {
            address: 'bnb',
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18,
            logoURI: BNB_LOGO,
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
