import { Icon } from "@iconify/react";
import tiktokFill from "@iconify/icons-ph/tiktok-logo-fill";
import twitterFill from "@iconify/icons-eva/twitter-fill";
import linkedinFill from "@iconify/icons-ph/linkedin-logo-fill";
import instagramFilled from "@iconify/icons-ant-design/instagram-filled";
// import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
// material
import { experimentalStyled as styled } from "@material-ui/core/styles";
import {
  Box,
  Grid,
  Link,
  Divider,
  Container,
  Typography,
  IconButton,
  Stack,
} from "@material-ui/core";
// routes
import { PATH_PAGE } from "../../routes/paths";
//
import Logo from "../../components/Logo";
import { GohelpImgStyle } from "./MainNavbar";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 88;

const SOCIALS = [
  { name: "Instagram", icon: instagramFilled },
  { name: "Linkedin", icon: linkedinFill },
  { name: "Facebook", icon: tiktokFill },
  { name: "Twitter", icon: twitterFill },
];

const RootStyle = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  backgroundColor: "#333333",
  marginTop: 170,
  height: APP_BAR_MOBILE,
  [theme.breakpoints.up("md")]: {
    height: APP_BAR_DESKTOP,
  },
}));

// ----------------------------------------------------------------------

export default function MainFooter() {
  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Grid
          container
          justifyContent={{ xs: "center", md: "space-between" }}
          sx={{
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Grid item xs={12} md={4}>
            <RouterLink to="/">
              <Logo type="white" />
            </RouterLink>
            {/* <GohelpImgStyle
                src="/static/home/gohelp_white.png"
                alt="Gohelp"
              /> */}
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack spacing={3} direction="row" justifyContent="center">
              {SOCIALS.map((social) => (
                <IconButton key={social.name} color="secondary">
                  <Icon icon={social.icon} width={20} height={20} />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Stack
              direction="row"
              justifyContent={{ xs: "center", md: "flex-end" }}
            >
              <Typography
                alignSelf={"right"}
                variant="caption"
                sx={{
                  color: (theme) => theme.palette.secondary.main,
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                Copyright 2010-2022. GoHelp
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
