import { useEffect, useState } from "react";
import { NavLink as RouterLink, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";
import { useWallet } from "use-wallet";
import { useMoralis } from "react-moralis";
import SearchIcon from "@material-ui/icons/Search";
import { Contract, providers, utils } from "ethers";
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
import navConfig from "./MenuConfig";
import MenuMobile from "./MenuMobile";
import MenuDesktop from "./MenuDesktop";
import Logo from "../../components/Logo";
import Label from "../../components/Label";
import useOffSetTop from "../../hooks/useOffSetTop";
import { PATH_AUTH, PATH_PAGE } from "../../routes/paths";
import { MHidden } from "../../components/@material-extend";
import Search from "../../components/custom-component/Search";
import SettingMode from "../../components/settings/SettingMode";
import { BlogPostsSearch } from "src/components/_dashboard/blog";
import Searchbar from "../../components/custom-component/Searchbar";
import { ProfileDialog } from "../../components/_external-pages/fundraise";
import ProfileButton from "../../components/custom-component/ProfileButton";
import ConnectButton from "../../components/custom-component/ConnectButton";

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
  const { isWeb3Enabled, isAuthenticated, account } = useMoralis();

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const web3 = new Web3(
  //         "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
  //       );
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   })();
  // }, [wallet]);

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <>
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
              {/* <MHidden width="smDown">
              <GohelpImgStyle src="/static/home/gohelp.png" alt="Gohelp" />
            </MHidden> */}
            </Stack>

            <MHidden width="mdDown">
              <MenuDesktop
                isOffset={isOffset}
                isHome={isHome}
                navConfig={navConfig}
              />
            </MHidden>

            <MHidden width="mdUp">
              <Searchbar />
            </MHidden>

            <MHidden width="mdDown">
              <Search />
            </MHidden>

            {isWeb3Enabled && isAuthenticated ? (
              <ProfileButton />
            ) : (
              <ConnectButton />
            )}

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

      {/* <ProfileDialog open={open} onClose={handleClose} /> */}
    </>
  );
}
