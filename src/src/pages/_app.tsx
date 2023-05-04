import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";

import "~/styles/globals.css";

const queryClient = new QueryClient({});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <title>ChitGPT</title>
        <meta
          name="description"
          content="Tugas Besar 3 Strategi Algoritma Teknik Informatika ITB Tahun 2022/2023"
        />
      </Head>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
};

export default MyApp;
