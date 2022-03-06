import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import flashFill from "@iconify/icons-eva/flash-fill";
import { Link as RouterLink } from "react-router-dom";
import trash2Fill from "@iconify/icons-eva/trash-2-fill";

// material
import { experimentalStyled as styled } from "@material-ui/core/styles";
import {
  Button,
  Box,
  Link,
  Container,
  Typography,
  Stack,
  IconButton,
} from "@material-ui/core";
// routes
import { PATH_DASHBOARD, PATH_PAGE } from "../../../routes/paths";
//
import {
  varFadeIn,
  varFadeInUp,
  varWrapEnter,
  varFadeInRight,
} from "../../animate";

import Grid from "@material-ui/core/Grid";

import MouseScroll from "../../scroll-down/MouseScroll";

// ----------------------------------------------------------------------

const RootStyle = styled(motion.div)(({ theme }) => ({
  // position: "relative",
  backgroundColor: theme.palette.background.body,
  [theme.breakpoints.up("md")]: {
    // bottom: 0,
    // left: 0,
    // width: "100%",
    // height: "30vh",
    display: "flex",
    // position: "fixed",
    alignItems: "center",
  },
}));

const ContentStyle = styled((props) => <Stack spacing={5} {...props} />)(
  ({ theme }) => ({
    zIndex: 10,
    maxWidth: 520,
    margin: "auto",
    textAlign: "center",
    position: "relative",
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(15),
    [theme.breakpoints.up("md")]: {
      margin: "unset",
      textAlign: "left",
    },
  })
);

const HeroOverlayStyle = styled(motion.img)({
  zIndex: 9,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

const HeroImgStyle = styled(motion.img)(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  width: "100%",
  margin: "auto",
  filter: `drop-shadow(40px 80px 80px rgba(0, 0, 0, 0.48))`,
  [theme.breakpoints.up("lg")]: {
    right: "8%",
    width: "auto",
    height: "48vh",
  },
}));

// ----------------------------------------------------------------------

export default function LandingBottom() {
  return (
    <RootStyle initial="initial" animate="animate" variants={varWrapEnter}>
      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: (theme) => theme.palette.background.neutral,
          borderRadius: 5,
        }}
      >
        <Grid container spacing={3} justify="center" alignItems="center">
          <Grid item xs={12} sm={6}>
            <ContentStyle>
              <motion.div variants={varFadeInRight}>
                <Typography variant="h1" sx={{ color: "text.primary" }}>
                  Are you ready to <br />
                  fundraising
                </Typography>
              </motion.div>

              <motion.div variants={varFadeInRight}>
                <Button
                  size="large"
                  variant="contained"
                  component={RouterLink}
                  to={PATH_PAGE.page404}
                  // startIcon={<Icon icon={flashFill} width={20} height={20} />}
                >
                  Start a GoHelp
                </Button>
              </motion.div>
            </ContentStyle>
          </Grid>
          <Grid item xs={12} sm={6} justify="center" alignItems="center">
            <HeroImgStyle
              alt="hero"
              src="/static/home/bottom-hero.png"
              variants={varFadeInUp}
            />
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
