import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import arrowRightFill from "@iconify/icons-eva/arrow-right-fill";
import {
  useTheme,
  experimentalStyled as styled,
} from "@material-ui/core/styles";
import {
  Box,
  Link,
  Grid,
  Stack,
  Button,
  Container,
  Typography,
} from "@material-ui/core";
import {
  varFadeIn,
  varFadeInUp,
  varWrapEnter,
  varFadeInRight,
} from "../../animate";
import { PATH_DASHBOARD, PATH_PAGE } from "../../../routes/paths";
import FundraiseDialog from "./FundraiseDialog";

// ----------------------------------------------------------------------

const RootStyle = styled(motion.div)(({ theme }) => ({
  paddingTop: theme.spacing(theme.shape.PAGE_TOP_PADDING),
  backgroundColor: theme.palette.background.default,
}));

const ContentStyle = styled((props) => <Stack spacing={5} {...props} />)(
  ({ theme }) => ({
    zIndex: 10,
    margin: "auto",
    textAlign: "center",
    [theme.breakpoints.up("md")]: {
      margin: "unset",
      textAlign: "left",
    },
  })
);

const HeroImgStyle = styled(motion.img)(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  width: "100%",
  margin: "auto",
  // filter: `drop-shadow(40px 80px 80px rgba(0, 0, 0, 0.48))`,
  [theme.breakpoints.up("lg")]: {
    right: "8%",
    width: "auto",
    height: "48vh",
  },
}));

const IconStyle = styled(motion.div)(({ theme, sx }) => ({
  ...sx,
  width: 40,
  height: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.common.white,
  boxShadow: "0px 2px 32px rgba(68, 68, 68, 0.12)",
  borderRadius: 40,
}));
// ----------------------------------------------------------------------

export default function LandingHero() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const isLight = theme.palette.mode === "light";

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <RootStyle initial="initial" animate="animate" variants={varWrapEnter}>
        <Container maxWidth="lg">
          <Grid container spacing={1} justify="center" alignItems="center">
            <Grid item xs={12} sm={6}>
              <ContentStyle>
                <motion.div variants={varFadeInRight}>
                  <Typography variant="h2" sx={{ color: "text.primary" }}>
                    Trusted fundraise <br />
                    for all of life’s
                    <br /> moments
                  </Typography>
                </motion.div>

                <motion.div variants={varFadeInRight}>
                  <Typography variant="body2" sx={{ color: "text.primary" }}>
                    Get help. Give kindness. Start in just 5 minutes.
                  </Typography>
                </motion.div>

                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent={{ xs: "center", md: "flex-start" }}
                  alignItems={{ xs: "center", md: "center" }}
                >
                  <motion.div variants={varFadeInRight}>
                    <Button
                      variant="contained"
                      component={RouterLink}
                      to={PATH_PAGE.fundraise}
                    >
                      Start a GoHelp
                    </Button>
                  </motion.div>

                  <Link
                    href="#"
                    target="_blank"
                    underline="none"
                    sx={{ color: "text.primary" }}
                  >
                    <Stack
                      component={motion.div}
                      variants={varFadeInRight}
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      justifyContent={{ xs: "center", md: "flex-start" }}
                    >
                      <IconStyle>
                        <Icon
                          icon={arrowRightFill}
                          color={theme.palette.primary.main}
                          width={theme.shape.ICON_SIZE}
                          height={theme.shape.ICON_SIZE}
                        />
                      </IconStyle>

                      <Typography variant="subtitle1">
                        See how GoHelp work{" "}
                      </Typography>
                    </Stack>
                  </Link>
                </Stack>
              </ContentStyle>
            </Grid>
            <Grid item xs={12} sm={6} justify="center" alignItems="center">
              <HeroImgStyle
                alt="hero"
                src={
                  isLight
                    ? "/static/home/light_hero.png"
                    : "/static/home/hero.png"
                }
                variants={varFadeInUp}
              />
            </Grid>
          </Grid>
        </Container>
      </RootStyle>
      <FundraiseDialog open={open} onClose={handleClose} />
    </>
  );
}
