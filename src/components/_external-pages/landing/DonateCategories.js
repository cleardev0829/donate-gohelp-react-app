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
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from "../~blog";
import { DonateCategoryCard } from "../landing";
import { getPostsInitial, getMorePosts } from "../../../redux/slices/fundraise";
import { CATEGORIES } from "src/utils/constants";

// ----------------------------------------------------------------------

const IMG = (index) =>
  `/static/donate_categories/donate_categories_${index}.png`;

const posts = [...Array(18)].map((_, index) => {
  const setIndex = index + 1;
  return {
    id: index,
    cover: IMG(setIndex),
    category: CATEGORIES[index],
  };
});

// ----------------------------------------------------------------------

const applySort = (posts, sortBy) => {
  if (sortBy === "latest") {
    return orderBy(posts, ["createdAt"], ["desc"]);
  }
  if (sortBy === "oldest") {
    return orderBy(posts, ["createdAt"], ["asc"]);
  }
  if (sortBy === "popular") {
    return orderBy(posts, ["view"], ["desc"]);
  }
  return posts;
};

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
  },
  marginBottom: theme.spacing(5),
}));

// ----------------------------------------------------------------------

export default function DonateCategories() {
  const theme = useTheme();
  const dispatch = useDispatch();
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
              Over 10,00 people start a GoHelp every day
            </Typography>
          </MotionInView>
        </ContentStyle>

        <Grid container spacing={theme.shape.CARD_MARGIN}>
          {posts.map((post) => (
            <DonateCategoryCard key={post.id} post={post} />
          ))}
        </Grid>
      </Container>
    </RootStyle>
  );
}
