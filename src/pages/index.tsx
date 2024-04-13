import Head from "next/head";
import styles from '@/styles/Home.module.css';
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Home page</title>
        <meta name="description" content="Discover all project features" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <a className={styles.btnLoginLink} onClick={() => router.push('/login')}>
          <p className={styles.btnLoginText}>Login</p>
        </a>
      </main>
    </>
  );
}
