import React, { createContext, useContext, useEffect, useState } from "react";
import { Client, Wallet } from "xrpl";

interface xrplContextType {
    xrplWallet: Wallet | undefined;
    getWalletFromSeed: (seed: string | undefined) => Wallet | undefined;
    getWalletFromFaucet: () => Promise<Wallet | undefined>;
}

const XRPLContext = createContext<xrplContextType | undefined>(undefined);

export const useXRPLContext = () => {
    const context = useContext(XRPLContext);
    if (!context) throw new Error("got an error trying to use the XRPLContext, please make sure that it is used within a XRPLProvider");
    return context;
}

export const XRPLProvider = ({ children }: any): React.JSX.Element => {
    const [xrplClient, setXrplClient] = useState<Client | undefined>(undefined);
    const [xrplWallet, setXrplWallet] = useState<Wallet | undefined>(undefined);

    const initializeXRPLClient = async () => {
        console.log("create new xrpl client");
        const client = new Client('wss://s.altnet.rippletest.net:51233'); // wss://s.altnet.rippletest.net:51233 is the current testnet address
        console.log("set the new client inside the xrplClient variable");
        client && setXrplClient(client);
    }

    const connectXRPLClient = (): boolean | undefined => {
        if (xrplClient && !xrplClient.isConnected()) {
            xrplClient.connect();
        } else {
            console.log("xrpl client already connected");
        }
        return (xrplClient !== undefined ? xrplClient.isConnected() : false);
    }

    const disconnectXRPLClient = (): boolean | undefined => {
        if (xrplClient && xrplClient.isConnected()) {
            xrplClient.disconnect();
        } else {
            console.log("xrpl client already disconnected");
        }
        return (xrplClient !== undefined ? !xrplClient.isConnected() : false);
    }

    const getWalletFromSeed = (seed: string | undefined) => {
        if (!seed || seed.length !== 31) return (undefined);
        const wallet = Wallet.fromSeed(seed);
        wallet && setXrplWallet(wallet);
        return (wallet);
    };

    const getWalletFromFaucet = async () => {
        if (xrplClient && xrplClient !== null) {
            try {
                const foundedWallet = await xrplClient.fundWallet(null, { faucetHost: undefined });
                foundedWallet && foundedWallet.wallet && setXrplWallet(foundedWallet.wallet);
                return (foundedWallet ? foundedWallet.wallet : undefined);
            } catch (error) {
                console.log("error from generate wallet:", error);
            }
        }
    };

    useEffect(() => {
        xrplClient === undefined && initializeXRPLClient();

        const isConnected = connectXRPLClient();
        console.log("connected to the xrpl client:", isConnected);

        const disconnectClient = () => {
            const isDisconnected = disconnectXRPLClient();
            console.log("disconnected to the xrpl client:", isDisconnected);
        };

        window.addEventListener('beforeunload', disconnectClient);

        return () => {
            disconnectClient();
        }
    }, []);

    return (
        <XRPLContext.Provider value={{ xrplWallet, getWalletFromSeed, getWalletFromFaucet }} >
            {children}
        </XRPLContext.Provider>
    )
}
