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
import { FUNDRAISE_TYPES } from "src/utils/constants";

// ----------------------------------------------------------------------

const IMG = (index) => `/static/start_fundraise/start_fundraise_${index}.png`;

const posts = [...Array(3)].map((_, index) => {
  const setIndex = index + 1;
  return {
    id: index,
    cover: IMG(setIndex),
    title: FUNDRAISE_TYPES[index],
  };
});

const RootStyle = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(theme.shape.PARAGRAPH_SPACING),
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
              variant="h3"
              paragraph
              sx={{
                ...(!isLight && {
                  textShadow: (theme) =>
                    `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`,
                }),
              }}
            >
              Start Fundraise Today
            </Typography>
          </MotionInView>

          <MotionInView variants={varFadeInUp}>
            <Typography
              variant="body1"
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
              variant="body1"
              color="primary"
              sx={{ mb: 5 }}
            >
              Learn about how GoHelp works
            </Typography>
          </MotionInView>
        </ContentStyle>

        <Grid container spacing={theme.shape.CARD_MARGIN}>
          {posts.map((post) => (
            <StartFundraiseCard key={post.id} post={post} />
          ))}
        </Grid>
      </Container>
    </RootStyle>
  );
}
