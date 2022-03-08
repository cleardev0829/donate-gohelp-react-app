import { Icon } from "@iconify/react";
import googleFill from "@iconify/icons-eva/google-fill";
import twitterFill from "@iconify/icons-eva/twitter-fill";
import facebookFill from "@iconify/icons-eva/facebook-fill";
import linkedinFill from "@iconify/icons-eva/linkedin-fill";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
// material
import { experimentalStyled as styled } from "@material-ui/core/styles";
import {
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

// ----------------------------------------------------------------------

const SOCIALS = [
  { name: "FaceBook", icon: facebookFill },
  { name: "Google", icon: googleFill },
  { name: "Linkedin", icon: linkedinFill },
  { name: "Twitter", icon: twitterFill },
];

const RootStyle = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: "#333333",
  padding: theme.spacing(10, 0),
}));

// ----------------------------------------------------------------------

export default function MainFooter() {
  return (
    <RootStyle>
      <Container maxWidth="lg" sx={{ pt: 10 }}>
        <Grid
          container
          spacing={1}
          justifyContent={{ xs: "center", md: "space-between" }}
          sx={{
            textAlign: { xs: "center", md: "left" },
          }}
        >
          {/* <Grid item xs={12} md={4}> */}
          <Stack spacing={1} direction="row" alignItems="center">
            <RouterLink to="/">
              <Logo />
            </RouterLink>
            <Typography variant="h5" color="secondary">
              Gohelp
            </Typography>
          </Stack>

          <Stack spacing={1} direction="row">
            {SOCIALS.map((social) => (
              <IconButton key={social.name} color="secondary" sx={{ p: 1 }}>
                <Icon icon={social.icon} width={16} height={16} />
              </IconButton>
            ))}
          </Stack>

          <Typography
            variant="body2"
            sx={{
              fontSize: 14,
              color: (theme) => theme.palette.secondary.main,
              textAlign: { xs: "center", md: "left" },
            }}
          >
            Copyright 2010-2022. GoHelp
          </Typography>
          {/* </Grid> */}
        </Grid>
      </Container>
    </RootStyle>
  );
}
