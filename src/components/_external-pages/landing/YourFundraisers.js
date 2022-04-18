import { useEffect, useCallback, useState } from "react";
import { orderBy } from "lodash";
import { Icon } from "@iconify/react";
import { useMoralis } from "react-moralis";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Box,
  Grid,
  Stack,
  useTheme,
  Skeleton,
  Container,
  Typography,
} from "@material-ui/core";
import { TopFundraiserCard } from ".";
import { varFadeInUp, MotionInView } from "../../animate";
import { useDispatch, useSelector } from "../../../redux/store";
import { alpha, experimentalStyled as styled } from "@material-ui/core/styles";
import {
  getPostsInitial,
  getMorePosts,
} from "../../../redux/slices/fundraiser";
import { Fundraiser } from "../profile";

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
  paddingTop: theme.spacing(0),
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

export default function TopFundraisers() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { posts, hasMore, index, step } = useSelector(
    (state) => state.fundraiser
  );
  const [filters, setFilters] = useState("latest");
  const [data, setData] = useState(posts);
  const isLight = theme.palette.mode === "light";
  const { account } = useMoralis();

  const onScroll = useCallback(() => {
    dispatch(getMorePosts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPostsInitial(index, step, account));
  }, [dispatch, index]);

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
        <Fundraiser />
      </Container>
    </RootStyle>
  );
}
