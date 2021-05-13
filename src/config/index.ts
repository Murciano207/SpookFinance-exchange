import bsc from './bsc.json';
import polygon from './polygon.json';

interface Connector {
    id: string;
    name: string;
    options: any;
}

export interface AssetMetadata {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    logoURI: string | undefined;
}

interface Config {
    network: string;
    chainId: number;
    native: string;
    rpc: string[];
    precision: number;
    subgraphUrl: string;
    explorer: string;
    poolsUrl: string;
    addresses: {
        bFactory: string;
        bActions: string;
        dsProxyRegistry: string;
        exchangeProxy: string;
        wnative: string;
        multicall: string;
    };
    assets: Record<string, AssetMetadata>;
    untrusted: string[];
    connectors: Record<string, Connector>;
}

const configs = {
    56: {
        untrusted: [],
        ...bsc,
    },
    137: {
        untrusted: [],
        ...polygon,
    },
};
// eslint-disable-next-line no-undef
const network = process.env.APP_CHAIN_ID || 137;

const config: Config = configs[network];

export default config;
