import "@fontsource/inter/variable.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Hellowo</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          fontFamily:
            "Inter, Plus Jakarta Sans, apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
          fontSizes: {
            xs: 13.33,
            sm: 14.63,
            md: 16,
            lg: 19.2,
            xl: 23.04
          },
          headings: {
            fontFamily: "inherit",
            sizes: {
              h1: { fontSize: 47.78 },
              h2: { fontSize: 39.81 },
              h3: { fontSize: 33.18 },
              h4: { fontSize: 27.65 },
              h5: { fontSize: 27.65 },
              h6: { fontSize: 27.65 }
            }
          },
          colorScheme: "light",
          primaryColor: "gray",
          primaryShade: 9,
          black: "#1E1E1E",
          white: "#F8F8F8",
          radius: { xs: 2, sm: 4, md: 8, lg: 16 },
          defaultRadius: 8,
          spacing: {
            xs: 4,
            sm: 8,
            md: 16,
            lg: 24,
            xl: 32
          },
          components: {
            NavLink: {
              defaultProps: {
                // Buat nge-trigger pas ke-hover kelihatan berubah bg nya
                // Khusus hanya tema black-white
                active: true
              },
              styles: (theme) => ({
                root: {
                  paddingInline: theme.spacing.md,
                  paddingBlock: theme.spacing.sm
                }
                // label: {
                //   fontWeight: 600
                // }
              })
            }
          }
        }}>
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}

