import { Lock } from '@snapshot-labs/lock/src';
import injected from '@snapshot-labs/lock/connectors/injected';
import walletconnect from '@snapshot-labs/lock/connectors/walletconnect';

import defaultLogo from '@/assets/connector/default.svg';
import metamaskLogo from '@/assets/connector/metamask.svg';
import trustwalletLogo from '@/assets/connector/trustwallet.svg';
import walletconnectLogo from '@/assets/connector/walletconnect.svg';

import config from '@/config';

const lock = new Lock();

const connectors = { injected, walletconnect };

for (const connectorId in connectors) {
    const connector = {
        key: connectorId,
        connector: connectors[connectorId],
        options: config.connectors[connectorId],
    };
    lock.addConnector(connector);
}

export function hasInjectedProvider(): boolean {
    return !!window.ethereum;
}

export function getConnectorName(connectorId: string): string {
    if (connectorId === 'injected') {
        const provider = window.ethereum;
        if (provider.isMetaMask) {
            return 'MetaMask';
        }
        if (provider.isTrust) {
            return 'Trust Wallet';
        }
        return 'Browser Wallet';
    }
    if (connectorId === 'walletconnect') {
        return 'WalletConnect';
    }
    return 'Unknown';
}

export function getConnectorLogo(connectorId: string): string {
    if (connectorId === 'injected') {
        const provider = window.ethereum;
        if (provider.isMetaMask) {
            return metamaskLogo;
        }
        if (provider.isTrust) {
            return trustwalletLogo;
        }
        return defaultLogo;
    }
    if (connectorId === 'walletconnect') {
        return walletconnectLogo;
    }
    return defaultLogo;
}

export default lock;
