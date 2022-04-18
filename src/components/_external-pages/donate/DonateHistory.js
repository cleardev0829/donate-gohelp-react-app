import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Box,
  Grid,
  Stack,
  Tooltip,
  Skeleton,
  Typography,
  CardContent,
} from "@material-ui/core";
import {
  useTheme,
  experimentalStyled as styled,
} from "@material-ui/core/styles";
import {
  varFadeIn,
  varFadeInUp,
  varWrapEnter,
  varFadeInRight,
} from "../../animate";
import Scrollbar from "../../Scrollbar";
import { filters } from "src/utils/constants";
import { fCurrency } from "src/utils/formatNumber";
import OutlineCard from "../../custom-component/OutlineCard";
import { useDispatch, useSelector } from "../../../redux/store";
import { getMorePosts, getPostsInitial } from "../../../redux/slices/donation";

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

const SkeletonLoad = (
  <Grid container spacing={2}>
    {[...Array(8)].map((_, index) => (
      <Grid item xs={12} md={12} key={index}>
        <Box sx={{ display: "flex", mt: 0 }}>
          <Skeleton variant="circular" sx={{ width: 40, height: 40 }} />
          <Skeleton variant="text" sx={{ mx: 1, flexGrow: 1 }} />
        </Box>
      </Grid>
    ))}
  </Grid>
);

DonateHitory.propTypes = {};

export default function DonateHitory() {
  const theme = useTheme();
  const params = useParams();
  const listInnerRef = useRef();
  const dispatch = useDispatch();
  const { posts, hasMore, index, step } = useSelector(
    (state) => state.donation
  );
  const [data, setData] = useState([]);

  const onScroll = useCallback(() => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        dispatch(getMorePosts());
      }
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPostsInitial(index, step, params.id));
  }, [dispatch, index, params]);

  useEffect(() => {
    const sortedPosts = applySort(posts, filters);
    setData(sortedPosts);
  }, [posts]);

  return (
    <div
      id="scrollableDiv"
      ref={listInnerRef}
      style={{
        height: 450,
        overflow: "auto",
        scrollbarWidth: "none",
      }}
      onScroll={onScroll}
    >
      <CardContent>
        <InfiniteScroll
          next={onScroll}
          hasMore={hasMore}
          loader={SkeletonLoad}
          dataLength={data.length}
          style={{ overflow: "inherit" }}
          scrollableTarget="scrollableDiv"
        >
          <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
            {data.map((donate, index) => (
              <OutlineCard key={`outlinecard-${index}`}>
                <CardContent key={`cardcontent-${index}`}>
                  <Stack
                    key={`up-stack-${index}`}
                    spacing={theme.shape.CARD_PADDING}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Tooltip title={donate.account}>
                      <Typography
                        key={`wallet-${index}`}
                        variant="subtitle2"
                        sx={{ color: "text.disabled", width: 30 }}
                        noWrap
                      >
                        {`${donate.account}`}
                      </Typography>
                    </Tooltip>
                    <Typography
                      key={`tp-amount-${index}`}
                      variant="subtitle2"
                      noWrap
                    >
                      {`${fCurrency(donate.crypto.amount)} (${
                        donate.crypto.count
                      } ${donate.crypto.type})`}
                    </Typography>
                  </Stack>
                </CardContent>
              </OutlineCard>
            ))}
          </Stack>
        </InfiniteScroll>
      </CardContent>
    </div>
  );
}
