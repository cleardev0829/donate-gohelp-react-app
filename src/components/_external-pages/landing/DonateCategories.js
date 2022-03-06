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
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from "../blog";
import { DonateCategoryCard } from "../landing";
import { getPostsInitial, getMorePosts } from "../../../redux/slices/blog";
// ----------------------------------------------------------------------

const IMG = (index) =>
  `/static/donate_categories/donate_categories_${index}.png`;

const TITLES = [
  "Medical",
  "Memorial",
  "Emergency",
  "Nonprofit",
  "Education",
  "Animals",
  "Environment",
  "Business",
  "Community",
  "Competition",
  "Creative",
  "Event",
  "Faith",
  "Family",
  "Sports",
  "Travel",
  "Volunteer",
  "Wishes",
];

const posts = [...Array(18)].map((_, index) => {
  const setIndex = index + 1;
  return {
    id: `0feb2990-4210-4170-93a4-37e8f5958a18-${setIndex}`,
    cover: IMG(setIndex),
    title: TITLES[index],
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

export default function DonateCategories() {
  const dispatch = useDispatch();
  // const [filters, setFilters] = useState("latest");
  // const { posts, hasMore, index, step } = useSelector((state) => state.blog);

  // const sortedPosts = applySort(posts, filters);
  // const onScroll = useCallback(() => dispatch(getMorePosts()), [dispatch]);

  // useEffect(() => {
  //   dispatch(getPostsInitial(index, step));
  // }, [dispatch, index, step]);

  // const handleChangeSort = (event) => {
  //   setFilters(event.target.value);
  // };

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
              Over 10,00 people start a GoHelp every day
            </Typography>
          </MotionInView>
        </ContentStyle>

        {/* <InfiniteScroll
          next={onScroll}
          hasMore={hasMore}
          loader={SkeletonLoad}
          dataLength={posts.length}
          style={{ overflow: "inherit" }}
        > */}
        <Grid container spacing={3}>
          {posts.map((post, index) => (
            <DonateCategoryCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
        {/* </InfiniteScroll> */}
      </Container>
    </RootStyle>
  );
}
