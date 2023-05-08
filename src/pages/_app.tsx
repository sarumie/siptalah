import "@fontsource/inter/variable-full.css";
import { AppProps } from "next/app";
import Head from "next/head";
import queryClient from "@/lib/reactQuery";
import { useRouter } from "next/router";
import {
  Session,
  createBrowserSupabaseClient
} from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import theme from "@/theme";
import Dashboard from "@/layouts/Dashboard";

export default function App(
  props: AppProps<{
    initialSession: Session;
  }>
) {
  const route = useRouter();
  const [supabase] = useState(() => createBrowserSupabaseClient());
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

      <SessionContextProvider
        supabaseClient={supabase}
        initialSession={pageProps.initialSession}>
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
      </SessionContextProvider>
    </>
  );
}

