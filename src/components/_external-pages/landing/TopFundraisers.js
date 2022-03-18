import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "../../../redux/store";
import InfiniteScroll from "react-infinite-scroll-component";
import { Icon } from "@iconify/react";
import { orderBy } from "lodash";
import { alpha, experimentalStyled as styled } from "@material-ui/core/styles";
import rightArrowAlt from "@iconify/icons-bxs/right-arrow-alt";
import arrowRightFill from "@iconify/icons-eva/arrow-right-fill";
import {
  Box,
  Grid,
  Skeleton,
  Stack,
  Container,
  Typography,
  useTheme,
} from "@material-ui/core";
import { varFadeInUp, MotionInView } from "../../animate";
import { getPostsInitial, getMorePosts } from "../../../redux/slices/blog";
import { getPosts } from "../../../redux/slices/fundraise";
import { TopFundraiserCard } from "../landing";

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "popular", label: "Popular" },
  { value: "oldest", label: "Oldest" },
];

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
  margin: "auto",
  textAlign: "center",
  [theme.breakpoints.up("md")]: {
    zIndex: 11,
    textAlign: "left",
  },
}));

const SkeletonLoad = (
  <Grid container spacing={3} sx={{ mt: 2 }}>
    {[...Array(3)].map((_, index) => (
      <Grid item xs={12} md={4} key={index}>
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

export default function TopFundraisers() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { posts, hasMore, index, step } = useSelector((state) => state.blog);
  const [filters, setFilters] = useState("latest");
  const [data, setData] = useState(posts);
  const isLight = theme.palette.mode === "light";

  const onScroll = useCallback(() => {
    dispatch(getMorePosts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPostsInitial(index, step));
  }, [dispatch, index, step]);

  // useEffect(() => {
  //   dispatch(getPosts(""));
  // }, [dispatch]);

  useEffect(() => {
    const sortedPosts = applySort(posts, filters);
    setData(sortedPosts);
  }, [posts]);

  const handleChangeSort = (event) => {
    setFilters(event.target.value);
  };

  const handleGetMorePost = () => {
    dispatch(getMorePosts());
  };

  return (
    <RootStyle>
      <Container maxWidth="lg">
        <ContentStyle>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: theme.shape.MAIN_VERTICAL_SPACING }}
          >
            <MotionInView variants={varFadeInUp}>
              <Typography
                component="p"
                variant="h3"
                sx={{ color: "text.primary" }}
              >
                Top Fundraisers
              </Typography>
            </MotionInView>

            {hasMore && (
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                onClick={handleGetMorePost}
                sx={{ cursor: "pointer" }}
              >
                <MotionInView variants={varFadeInUp}>
                  <Typography
                    component="p"
                    variant="h4"
                    color={theme.palette.primary.main}
                  >
                    More
                  </Typography>
                </MotionInView>
                <MotionInView variants={varFadeInUp}>
                  <Icon
                    icon={rightArrowAlt}
                    color={theme.palette.primary.main}
                    width={theme.shape.ICON_SIZE}
                    height={theme.shape.ICON_SIZE}
                  />
                </MotionInView>
              </Stack>
            )}
          </Stack>
        </ContentStyle>

        <InfiniteScroll
          next={onScroll}
          hasMore={hasMore}
          loader={SkeletonLoad}
          dataLength={posts.length}
          style={{ overflow: "inherit" }}
        >
          <Grid container spacing={theme.shape.CARD_MARGIN}>
            {/* {sortedPosts.splice(0, 3).map((post, index) => (
              <TopFundraiserCard key={post.id} post={post} index={index} />
            ))} */}

            {data.length > 0 &&
              data.map((post, index) => (
                <TopFundraiserCard key={post.id} post={post} />
              ))}
          </Grid>
        </InfiniteScroll>
      </Container>
    </RootStyle>
  );
}
