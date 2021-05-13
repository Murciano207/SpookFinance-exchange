import BigNumber from 'bignumber.js';
import { Contract } from '@ethersproject/contracts';
import { Web3Provider } from '@ethersproject/providers';
import { Swap } from 'yogi-sor/dist/types';

import ExchangeProxyABI from '../abi/ExchangeProxy.json';

import config from '@/config';

const NATIVE_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
const exchangeProxyAddress = config.addresses.exchangeProxy;

export default class Swapper {
    static async swapIn(
        provider: Web3Provider,
        swaps: Swap[][],
        assetInAddress: string,
        assetOutAddress: string,
        assetInAmount: BigNumber,
        assetOutAmountMin: BigNumber,
    ): Promise<any> {
        const overrides: any = {};
        if (assetInAddress === config.native) {
            assetInAddress = NATIVE_ADDRESS;
            overrides.value = `0x${assetInAmount.toString(16)}`;
        }
        if (assetOutAddress === config.native) {
            assetOutAddress = NATIVE_ADDRESS;
        }
        const exchangeProxyContract = new Contract(exchangeProxyAddress, ExchangeProxyABI, provider.getSigner());
        try {
            return await exchangeProxyContract.multihopBatchSwapExactIn(
                swaps,
                assetInAddress,
                assetOutAddress,
                assetInAmount.toString(),
                assetOutAmountMin.toString(),
                overrides,
            );
        } catch(e) {
            return e;
        }
    }

    static async swapOut(
        provider: Web3Provider,
        swaps: Swap[][],
        assetInAddress: string,
        assetOutAddress: string,
        assetInAmountMax: BigNumber,
    ): Promise<any> {
        const overrides: any = {};
        if (assetInAddress === config.native) {
            assetInAddress = NATIVE_ADDRESS;
            overrides.value = `0x${assetInAmountMax.toString(16)}`;
        }
        if (assetOutAddress === config.native) {
            assetOutAddress = NATIVE_ADDRESS;
        }
        const exchangeProxyContract = new Contract(exchangeProxyAddress, ExchangeProxyABI, provider.getSigner());
        try {
            return await exchangeProxyContract.multihopBatchSwapExactOut(
                swaps,
                assetInAddress,
                assetOutAddress,
                assetInAmountMax.toString(),
                overrides,
            );
        } catch(e) {
            return e;
        }
    }
}
