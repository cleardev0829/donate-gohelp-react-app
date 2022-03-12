import { NavLink as RouterLink, useLocation } from "react-router-dom";
// material
import { experimentalStyled as styled } from "@material-ui/core/styles";
import {
  Box,
  Button,
  AppBar,
  Toolbar,
  Container,
  Stack,
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

const APP_BAR_MOBILE = 94;
const APP_BAR_DESKTOP = 118;

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
  const isOffset = useOffSetTop(100);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

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
          <Stack spacing={15} direction="row" alignItems="center">
            <Stack spacing={1} direction="row" alignItems="center">
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
          </Stack>

          {/* <Box sx={{ flexGrow: 1 }} /> */}
          <MHidden width="mdDown">
            <SettingMode />
          </MHidden>

          <Stack spacing={3} direction="row" alignItems="center">
            <MHidden width="mdDown">
              <Search />
            </MHidden>
            <RouterLink
              to={PATH_PAGE.page404}
              style={{ textDecoration: "none", marginRight: 10, color: "#fff" }}
            >
              <Button size="large" variant="contained">
                Connect your wallet
              </Button>
            </RouterLink>
          </Stack>

          <MHidden width="mdUp">
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
