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
  width: "100%",
  position: "absolute",
  bottom: theme.spacing(20),
  zIndex: 1,
  [theme.breakpoints.up("md")]: {
    display: "flex",
    alignItems: "center",
  },
}));

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
    // height: "48vh",
  },
}));

// ----------------------------------------------------------------------

export default function LandingBottom() {
  return (
    <RootStyle>
      <Container maxWidth="lg" sx={{ pb: 10 }}>
        <Box
          sx={{
            backgroundColor: (theme) => theme.palette.background.paper,
            borderRadius: 2,
            px: 5,
            pb: 5,
          }}
        >
          <Grid container spacing={3} justify="center" alignItems="center">
            <Grid item xs={12} sm={6}>
              <Stack spacing={5}>
                <motion.div variants={varFadeInRight}>
                  <Typography variant="h2" sx={{ color: "text.primary" }}>
                    Are you ready to <br />
                    fundraise
                  </Typography>
                </motion.div>

                <motion.div variants={varFadeInRight}>
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to={PATH_PAGE.view}
                  >
                    Start a GoHelp
                  </Button>
                </motion.div>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} justify="center" alignItems="center">
              <HeroImgStyle
                alt="hero"
                src="/static/home/bottom-hero.png"
                variants={varFadeInUp}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </RootStyle>
  );
}
