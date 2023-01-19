import { createGetInitialProps } from "@mantine/next";
import Document, { Html, Head, Main, NextScript } from "next/document";

const GetInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = GetInitialProps;

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

