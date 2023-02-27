import "@fontsource/inter/variable.css";
import { AppProps } from "next/app";
import Head from "next/head";
import theme from "@/theme";
import { MantineProvider } from "@mantine/core";
import Dashboard from "@/layouts/Dashboard";
import { useRouter } from "next/router";

export default function App(props: AppProps) {
  const route = useRouter();
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
        {route.asPath.split("/").includes("d") ? (
          <Dashboard>
            <Component {...pageProps} />
          </Dashboard>
        ) : (
          <Component {...pageProps} />
        )}
      </MantineProvider>
    </>
  );
}
