import { JsonRpcProvider } from '@ethersproject/providers';

import config from '@/config';

// TODO: randomize rpc
const provider = new JsonRpcProvider(config.rpc[0], config.chainId);

export default provider;
