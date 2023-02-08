import "@fontsource/inter/variable.css";
import { AppProps } from "next/app";
import Head from "next/head";
import theme from "@/theme";
import { MantineProvider } from "@mantine/core";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>SPPS - Development</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-sca le=1, width=device-width"
        />
      </Head>

      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
