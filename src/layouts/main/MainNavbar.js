import { NavLink as RouterLink, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
// material
import { experimentalStyled as styled } from "@material-ui/core/styles";
import {
  Box,
  Link,
  Stack,
  AppBar,
  Button,
  Toolbar,
  Container,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
// hooks
import useOffSetTop from "../../hooks/useOffSetTop";
// components
import Logo from "../../components/Logo";
import Search from "../../components/Search";
import Label from "../../components/Label";
import SettingMode from "../../components/settings/SettingMode";
import { MHidden } from "../../components/@material-extend";
//
import MenuDesktop from "./MenuDesktop";
import MenuMobile from "./MenuMobile";
import navConfig from "./MenuConfig";
// routes
import { PATH_AUTH, PATH_PAGE } from "../../routes/paths";
import { BlogPostsSearch } from "src/components/_dashboard/blog";
import Searchbar from "./Searchbar";
import { Contract, providers, utils } from "ethers";
import { useWallet } from "use-wallet";
import { Connect } from "src/components/Connect";
import toast from "react-hot-toast";
import { useEffect } from "react";

const Web3 = require("web3");

// const APP_BAR_MOBILE = 94;
// const APP_BAR_DESKTOP = 118;

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 88;

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: APP_BAR_MOBILE,
  [theme.breakpoints.up("md")]: {
    height: APP_BAR_DESKTOP,
  },
}));

export const GohelpImgStyle = styled("img")({
  width: 99,
  height: 26,
});
// ----------------------------------------------------------------------

export default function MainNavbar() {
  const wallet = useWallet();
  const isOffset = useOffSetTop(100);
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const isConnected = !!wallet?.account;

  useEffect(() => {
    (async () => {
      try {
        const web3 = new Web3(
          "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
        );
      } catch (e) {
        console.log(e);
      }
    })();
  }, [wallet]);

  return (
    <AppBar sx={{ boxShadow: 0 }}>
      <ToolbarStyle
        disableGutters
        sx={{
          bgcolor: "background.paper",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Stack direction="row" alignItems="center">
            <RouterLink to="/">
              <Logo />
            </RouterLink>
            <MHidden width="smDown">
              <GohelpImgStyle src="/static/home/gohelp.png" alt="Gohelp" />
            </MHidden>
          </Stack>

          <MHidden width="mdDown">
            <MenuDesktop
              isOffset={isOffset}
              isHome={isHome}
              navConfig={navConfig}
            />
          </MHidden>

          <Link
            component={RouterLink}
            variant="subtitle2"
            color="inherit"
            underline="none"
            to={PATH_PAGE.fundraisers}
            sx={{
              display: "block",
              color: "text.primary",
              transition: (theme) => theme.transitions.create("all"),
              "&:hover": { color: "primary.main" },
            }}
          >
            Your Fundraisers
          </Link>

          <MHidden width="mdUp">
            <Searchbar />
          </MHidden>

          <MHidden width="mdDown">
            <Search />
          </MHidden>

          <MHidden width="mdUp">
            <Box
              sx={{
                display: "flex",
                color: "primary.main",
                justifyContent: "center",
              }}
            >
              <Icon icon="carbon:wallet" width={24} height={24} />
            </Box>
          </MHidden>

          <MHidden width="mdDown">
            {/* <Button size="small" variant="contained">
              Connect
            </Button> */}
            {!isConnected && <Connect />}
          </MHidden>

          <MHidden width="mdDown">
            <SettingMode />
          </MHidden>

          <MHidden width="mdUp">
            <MHidden width="mdUp">
              <SettingMode />
            </MHidden>

            <MenuMobile
              isOffset={isOffset}
              isHome={isHome}
              navConfig={navConfig}
            />
          </MHidden>
        </Container>
      </ToolbarStyle>

      {/* {isOffset && <ToolbarShadowStyle />} */}
    </AppBar>
  );
}
