// routes
import Router from "./routes";
// theme
import ThemeConfig from "./theme";
// hooks
import useAuth from "./hooks/useAuth";
// components
import Settings from "./components/settings";
import RtlLayout from "./components/RtlLayout";
import ScrollToTop from "./components/ScrollToTop";
import LoadingScreen from "./components/LoadingScreen";
import GoogleAnalytics from "./components/GoogleAnalytics";
import NotistackProvider from "./components/NotistackProvider";
import ThemePrimaryColor from "./components/ThemePrimaryColor";
import { UseWalletProvider } from "use-wallet";
import { Toaster } from "react-hot-toast";
import { MoralisProvider } from "react-moralis";

// ----------------------------------------------------------------------

export default function App() {
  const { isInitialized } = useAuth();

  return (
    <UseWalletProvider
      connectors={{
        injected: {
          //allows you to connect and switch between mainnet and rinkeby within Metamask.
          chainId: [1],
        },
        walletconnect: {
          chainId: 1,
          rpcUrl:
            "https://mainnet.infura.io/v3/84842078b09946638c03157f83405213",
        },
      }}
    >
      <MoralisProvider
        serverUrl="https://dh3yon2lni9b.usemoralis.com:2053/server"
        appId="IPmAIQsjnEu7SkSCl8iXTaBRqqR0Gdapyq2STUf4"
      >
        <ThemeConfig>
          <ThemePrimaryColor>
            <RtlLayout>
              <NotistackProvider>
                {/* <Settings /> */}
                <ScrollToTop />
                <GoogleAnalytics />
                <Toaster />
                {isInitialized ? <Router /> : <LoadingScreen />}
              </NotistackProvider>
            </RtlLayout>
          </ThemePrimaryColor>
        </ThemeConfig>
      </MoralisProvider>
    </UseWalletProvider>
  );
}
