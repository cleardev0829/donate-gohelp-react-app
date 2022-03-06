import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "../../../redux/store";
import InfiniteScroll from "react-infinite-scroll-component";
import { orderBy } from "lodash";
import { alpha, experimentalStyled as styled } from "@material-ui/core/styles";
import {
  Grid,
  Box,
  Skeleton,
  Stack,
  Container,
  Typography,
  useTheme,
} from "@material-ui/core";
//
import { varFadeInUp, MotionInView } from "../../animate";
import { StartFundraiseCard } from "../landing";

const IMG = (index) =>
  `/static/start_fundraising/start_fundraising_${index}.png`;

const TITLES = ["For yourself", "For a friend", "For a charity"];

const posts = [...Array(3)].map((_, index) => {
  const setIndex = index + 1;
  return {
    id: `0feb2990-4210-4170-93a4-37e8f5958a18-${setIndex}`,
    cover: IMG(setIndex),
    title: TITLES[index],
  };
});

const RootStyle = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 620,
  margin: "auto",
  textAlign: "center",
  [theme.breakpoints.up("md")]: {
    zIndex: 11,
    textAlign: "center",
    // position: "absolute",
  },
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

export default function StartFundraise() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  return (
    <RootStyle>
      <Container maxWidth="lg">
        <ContentStyle>
          <MotionInView variants={varFadeInUp}>
            <Typography
              variant="h2"
              paragraph
              sx={{
                ...(!isLight && {
                  textShadow: (theme) =>
                    `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`,
                }),
              }}
            >
              Start Fundraising Today
            </Typography>
          </MotionInView>

          <MotionInView variants={varFadeInUp}>
            <Typography
              variant="p3"
              paragraph
              sx={{
                ...(!isLight && {
                  textShadow: (theme) =>
                    `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`,
                }),
              }}
            >
              More money raised online than anywhere else.
            </Typography>
          </MotionInView>

          <MotionInView variants={varFadeInUp}>
            <Typography
              component="p"
              variant="p3"
              color="primary"
              sx={{ mb: 5 }}
            >
              Learn about how GoHelp works
            </Typography>
          </MotionInView>
        </ContentStyle>

        <Grid container spacing={3}>
          {posts.map((post, index) => (
            <StartFundraiseCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
      </Container>
    </RootStyle>
  );
}
