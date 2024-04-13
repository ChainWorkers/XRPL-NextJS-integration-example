import Head from "next/head";
import styles from '@/styles/Login.module.css';
import { useXRPLContext } from "@/contexts/XRPLContext";
import { useEffect, useState } from "react";

export default function Login() {
    const { xrplWallet, getWalletFromSeed, getWalletFromFaucet } = useXRPLContext();
    const [seed, setSeed] = useState("");

    useEffect(() => {
        xrplWallet && console.log("you are now connected with the walletAddress:", xrplWallet.classicAddress, "and with the seed:", xrplWallet.seed);
    }, [xrplWallet]);

    return (
        <>
            <Head>
                <title>Login page</title>
                <meta name="description" content="Discover all project features" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <div className={styles.walletAccountInfoContainer}>
                    {xrplWallet ?
                        <div className={styles.walletNotConnectedContainer}>
                            <p>Wallet connected using xrp ledger, contain:</p>
                            <p>- address: {xrplWallet.address}</p>
                            <p>- classicAddress: {xrplWallet.classicAddress}</p>
                            <p>- privateKey: {xrplWallet.privateKey}</p>
                            <p>- publicKey: {xrplWallet.publicKey}</p>
                            <p>- seed: {xrplWallet.seed}</p>
                        </div> :
                        <div className={styles.walletContainer}>
                            <p>Wallet not connected</p>
                        </div>
                    }
                </div>
                <div className={styles.manualLoginContainer}>
                    <div className={styles.loginContainer}>
                        <p className={styles.loginTitle}>Generate a wallet</p>
                        <a className={styles.btnLoginLink} onClick={async () => await getWalletFromFaucet()}>
                            <p className={styles.btnLoginText}>Generate a new wallet from xrp faucet</p>
                        </a>
                    </div>
                    <div className={styles.loginContainer}>
                        <p className={styles.loginTitle}>Import a wallet</p>
                        <input onChange={(e) => setSeed(e.target.value)} placeholder="Enter a seed like as 'sEd77cxtPM4cy1mGfM4zH92s562ZJYC'" className={styles.seedInput} />
                        <a className={styles.btnLoginLink} onClick={() => getWalletFromSeed(seed)}>
                            <p className={styles.btnLoginText}>Connect to your created wallet using your seed</p>
                        </a>
                    </div>
                </div>
            </main>
        </>
    );
}
