import "@fontsource/inter/variable-full.css";
import { AppProps } from "next/app";
import Head from "next/head";
import theme from "@/theme";
import { MantineProvider } from "@mantine/core";
import Dashboard from "@/layouts/Dashboard";
import { useRouter } from "next/router";
import { NotificationsProvider } from "@mantine/notifications";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/lib/reactQuery";

export default function App(props: AppProps) {
  const route = useRouter();
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>SPPS - Development</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <QueryClientProvider client={queryClient}>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
          <NotificationsProvider>
            {route.asPath.split("/").includes("d") ? (
              <Dashboard>
                <Component {...pageProps} />
              </Dashboard>
            ) : (
              <Component {...pageProps} />
            )}
          </NotificationsProvider>
        </MantineProvider>
      </QueryClientProvider>
    </>
  );
}

