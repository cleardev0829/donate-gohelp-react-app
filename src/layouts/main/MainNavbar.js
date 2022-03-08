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
import { MHidden } from "../../components/@material-extend";
//
import MenuDesktop from "./MenuDesktop";
import MenuMobile from "./MenuMobile";
import navConfig from "./MenuConfig";
// routes
import { PATH_AUTH, PATH_PAGE } from "../../routes/paths";
import { BlogPostsSearch } from "src/components/_dashboard/blog";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 88;

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: APP_BAR_MOBILE,
  transition: theme.transitions.create(["height", "background-color"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up("md")]: {
    height: APP_BAR_DESKTOP,
  },
}));

const ToolbarShadowStyle = styled("div")(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: "auto",
  borderRadius: "50%",
  position: "absolute",
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8,
}));

// ----------------------------------------------------------------------

export default function MainNavbar() {
  const isOffset = useOffSetTop(100);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <AppBar color={isHome ? "transparent" : "inherit"} sx={{ boxShadow: 0 }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            bgcolor: "background.default",
            height: { md: APP_BAR_DESKTOP - 16 },
          }),
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
          <Stack spacing={1} direction="row" alignItems={"center"}>
            <RouterLink to="/">
              <Logo />
            </RouterLink>
            {/* <Label color="primary" sx={{ ml: 1 }}>
            Gohelp
          </Label> */}
            <Typography variant="h5" color="primary">
              Gohelp
            </Typography>
          </Stack>

          <MHidden width="mdDown">
            <MenuDesktop
              isOffset={isOffset}
              isHome={isHome}
              navConfig={navConfig}
            />
          </MHidden>

          {/* <Box sx={{ flexGrow: 1 }} /> */}

          <MHidden width="mdDown">
            <Search />
          </MHidden>

          <RouterLink
            to={PATH_PAGE.page404}
            style={{ textDecoration: "none", marginRight: 10, color: "#fff" }}
          >
            <Button variant="contained">Connect your wallet</Button>
          </RouterLink>
          {/* <RouterLink
            to={PATH_AUTH.register}
            style={{ textDecoration: "none", marginRight: 10 }}
          >
            <Button variant="contained">Sign up</Button>
          </RouterLink> */}
          <MHidden width="mdUp">
            <MenuMobile
              isOffset={isOffset}
              isHome={isHome}
              navConfig={navConfig}
            />
          </MHidden>
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
