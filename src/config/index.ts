import bsc from './bsc.json';

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
    rpc: string[];
    precision: number;
    subgraphUrl: string;
    addresses: {
        bFactory: string;
        bActions: string;
        dsProxyRegistry: string;
        exchangeProxy: string;
        wbnb: string;
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
};
// eslint-disable-next-line no-undef
const network = process.env.APP_CHAIN_ID || 56;

const config: Config = configs[network];

export default config;
