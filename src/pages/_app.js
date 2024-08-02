import Layout from "@/components/Layout";
import { UserContextProvider } from "@/contexts/UserContext";

export default function App({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </UserContextProvider>
  );
}
