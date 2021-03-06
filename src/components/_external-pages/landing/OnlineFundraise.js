import { useEffect, useCallback, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import _ from "lodash";
import { motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  alpha,
  useTheme,
  experimentalStyled as styled,
} from "@material-ui/core/styles";
import {
  Box,
  Grid,
  Stack,
  Button,
  Skeleton,
  Container,
  Typography,
} from "@material-ui/core";
import {
  varFadeIn,
  varFadeInUp,
  varWrapEnter,
  varFadeInRight,
  MotionInView,
} from "../../animate";
import { OnlineFundraiseCard } from ".";
import { useDispatch, useSelector } from "../../../redux/store";
import { PATH_DASHBOARD, PATH_PAGE } from "../../../routes/paths";
import { getPostsInitial, getMorePosts } from "../../../redux/slices/fundraise";

// ----------------------------------------------------------------------

const IMG = (index) => `/static/online_fundraise/online_fundraise_${index}.png`;

const TITLES = [
  "Donor protection guarantee",
  "Simple setup",
  "Secure",
  "Mobile app",
  "Social reach",
  "Expert advice",
];

const DESCRIPTIONS = [
  "GoHelp has the firdt and only donor gurantee in the industry",
  "You can personalized and share your GoHelp in just a few minutes.",
  "Our Trust and Safety team works around the clock to project against fraud.",
  "The GoHelp app makes it simple to launch and manage your fundraiser on the go.",
  "Harness the power of social media to spread your story and get more support.",
  "Our best-in-class customer care specialists will answer your questions, day or night.",
];

const posts = [...Array(6)].map((_, index) => {
  const setIndex = index + 1;
  return {
    id: `0feb2990-4210-4170-93a4-37e8f5958a18-${setIndex}`,
    cover: IMG(setIndex),
    title: TITLES[index],
    description: DESCRIPTIONS[index],
  };
});
const RootStyle = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(theme.shape.PARAGRAPH_SPACING),
  paddingBottom: theme.spacing(theme.shape.PARAGRAPH_SPACING),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 620,
  margin: "auto",
  textAlign: "center",
  [theme.breakpoints.up("md")]: {
    zIndex: 11,
    textAlign: "center",
  },
  marginBottom: theme.spacing(5),
}));

const SkeletonLoad = (
  <Grid container spacing={3} sx={{ mt: 2 }}>
    {[...Array(4)].map((_, index) => (
      <Grid item xs={12} md={3} key={index}>
        <Skeleton
          variant="rectangular"
          width="100%"
          sx={{ height: 200, borderRadius: 2 }}
        />
        <Box sx={{ display: "flex", mt: 1.5 }}>
          <Skeleton variant="circular" sx={{ width: 40, height: 40 }} />
          <Skeleton variant="text" sx={{ mx: 1, flexGrow: 1 }} />
        </Box>
      </Grid>
    ))}
  </Grid>
);
// ----------------------------------------------------------------------

export default function OnlineFundraise() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  return (
    <RootStyle>
      <Container maxWidth="lg">
        <ContentStyle>
          <MotionInView variants={varFadeInUp}>
            <Typography
              variant="h4"
              paragraph
              sx={{
                ...(!isLight && {
                  textShadow: (theme) =>
                    `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`,
                }),
              }}
            >
              The leader in online fundraise
            </Typography>
          </MotionInView>
        </ContentStyle>

        <Grid
          container
          spacing={theme.shape.CARD_MARGIN_LG}
          sx={{ mb: theme.shape.CARD_MARGIN }}
        >
          {_.slice(posts, 0, 3).map((post, index) => (
            <OnlineFundraiseCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
        <Grid container spacing={theme.shape.CARD_MARGIN_LG}>
          {_.slice(posts, 3, 6).map((post, index) => (
            <OnlineFundraiseCard key={post.id} post={post} index={index} />
          ))}
        </Grid>

        {/* <ContentStyle>
          <motion.div variants={varFadeInRight}>
            <Button
              variant="contained"
              // component={RouterLink}
              // to={PATH_PAGE.view}
              sx={{ mt: theme.shape.MAIN_VERTICAL_SPACING }}
            >
              Start a GoHelp
            </Button>
          </motion.div>
        </ContentStyle> */}
      </Container>
    </RootStyle>
  );
}
