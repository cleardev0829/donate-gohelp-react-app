import { Icon } from "@iconify/react";
import googleFill from "@iconify/icons-eva/google-fill";
import twitterFill from "@iconify/icons-eva/twitter-fill";
import facebookFill from "@iconify/icons-eva/facebook-fill";
import linkedinFill from "@iconify/icons-eva/linkedin-fill";
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

const SOCIALS = [
  { name: "Instagram", icon: instagramFilled },
  { name: "Linkedin", icon: linkedinFill },
  { name: "Facebook", icon: facebookFill },
  { name: "Twitter", icon: twitterFill },
];

const RootStyle = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: "#333333",
  marginTop: 250,
  padding: theme.spacing(28, 0, 12, 0),
}));

// ----------------------------------------------------------------------

export default function MainFooter() {
  return (
    <RootStyle>
      <Container maxWidth="lg" sx={{}}>
        <Grid
          container
          spacing={1}
          justifyContent={{ xs: "center", md: "space-between" }}
          sx={{
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Grid item xs={12} md={4}>
            <Stack
              spacing={1}
              direction="row"
              alignItems="center"
              justifyContent={{ xs: "center", md: "flex-start" }}
            >
              <RouterLink to="/">
                <Logo type="white" />
              </RouterLink>
              <GohelpImgStyle
                src="/static/home/gohelp_white.png"
                alt="Gohelp"
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={1} direction="row" justifyContent="center">
              {SOCIALS.map((social) => (
                <IconButton key={social.name} color="secondary" sx={{ p: 1 }}>
                  <Icon icon={social.icon} width={20} height={20} />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack
              direction="row"
              justifyContent={{ xs: "center", md: "flex-end" }}
            >
              <Typography
                alignSelf={"right"}
                variant="body2"
                sx={{
                  fontSize: 14,
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
