import "@fontsource/inter/variable.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { CLIENT_RENEG_LIMIT } from "tls";

export default function App(props: AppProps) {
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

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          fontFamily:
            "Inter, Plus Jakarta Sans, apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
          fontSizes: {
            xs: 12,
            sm: 14,
            md: 16,
            lg: 18,
            xl: 20
          },
          headings: {
            fontFamily: "inherit",
            sizes: {
              h1: { fontSize: 32.44 },
              h2: { fontSize: 28.83 },
              h3: { fontSize: 25.63 },
              h4: { fontSize: 22.78 },
              h5: { fontSize: 22.78 },
              h6: { fontSize: 22.78 }
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
            },
            Button: {
              // @ts-ignore
              styles(theme, params) {
                if (params.variant == "outline")
                  return {
                    root: {
                      ":hover": {
                        backgroundColor: theme.colors.gray[2]
                      }
                    }
                  };

                return {};
              }
            }
          }
        }}>
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
