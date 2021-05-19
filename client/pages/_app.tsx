import { AppProps } from "next/dist/next-server/lib/router/router";
import { Layout } from "../layout/Layout";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
