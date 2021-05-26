import { JsonRpcProvider } from '@ethersproject/providers';

import config from '@/config';

const idx = Math.floor(Math.random() * config.rpc.length);
const provider = new JsonRpcProvider(config.rpc[idx]);

export default provider;
