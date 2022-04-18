import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Box,
  Grid,
  Stack,
  Divider,
  Skeleton,
  CardContent,
} from "@material-ui/core";
import {
  useTheme,
  experimentalStyled as styled,
} from "@material-ui/core/styles";
import {
  CoverImgStyle,
  CardMediaStyle,
} from "src/components/custom-component/CommonStyles";
import { useDispatch } from "react-redux";
import { filters } from "src/utils/constants";
import { useSelector } from "../../../redux/store";
import { getMorePosts, getPostsInitial } from "../../../redux/slices/update";

// ----------------------------------------------------------------------

const modules = {
  toolbar: false,
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
  syntax: true,
  clipboard: {
    matchVisual: false,
  },
};

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

const QuillWrapperStyle = styled("div")(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  border: `solid 0px ${theme.palette.grey[500_32]}`,
  "& .ql-container.ql-snow": {
    borderColor: "transparent",
    ...theme.typography.body1,
    fontFamily: theme.typography.fontFamily,
  },
  "& .ql-editor": {
    // minHeight: 200,
    "&.ql-blank::before": {
      fontStyle: "normal",
      color: theme.palette.text.disabled,
    },
    "& pre.ql-syntax": {
      ...theme.typography.body2,
      padding: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.grey[900],
    },
  },
}));

const SkeletonLoad = (
  <CardContent>
    <Grid container spacing={2}>
      {[...Array(2)].map((_, index) => (
        <Grid item xs={12} md={12} key={index}>
          <Skeleton
            variant="rectangular"
            width="100%"
            sx={{ height: 100, borderRadius: 2 }}
          />
          <Box sx={{ display: "flex", mt: 1 }}>
            <Skeleton variant="circular" sx={{ width: 40, height: 40 }} />
            <Skeleton variant="text" sx={{ mx: 1, flexGrow: 1 }} />
          </Box>
        </Grid>
      ))}
    </Grid>
  </CardContent>
);

DonateUpdates.propTypes = {};

export default function DonateUpdates() {
  const theme = useTheme();
  const params = useParams();
  const listInnerRef = useRef();
  const dispatch = useDispatch();
  const { posts, hasMore, index, step } = useSelector((state) => state.update);
  const [data, setData] = useState(posts);

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
      <InfiniteScroll
        next={onScroll}
        hasMore={hasMore}
        loader={SkeletonLoad}
        dataLength={data.length}
        style={{ overflow: "inherit" }}
        scrollableTarget="scrollableDiv"
      >
        <Stack spacing={theme.shape.MAIN_VERTICAL_SPACING}>
          {data.map((update, index) => (
            <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
              <QuillWrapperStyle key={`quil-wrapper-${index}`}>
                <ReactQuill
                  key={`react-quill-${index}`}
                  readOnly
                  value={update.description.content}
                  modules={modules}
                  style={{
                    margin: 0,
                  }}
                />
              </QuillWrapperStyle>
              {update.cover && (
                <CardContent>
                  <CardMediaStyle>
                    <CoverImgStyle
                      alt="cover"
                      src={update.cover.preview}
                      sx={{
                        transform: `rotate(${
                          ((-1 * update.cover.rotate) % 4) * 90
                        }deg) scale(${1 + update.cover.scale / 100})`,
                      }}
                    />
                  </CardMediaStyle>
                </CardContent>
              )}
              {index < data.length - 1 && <Divider key={`divider-${index}`} />}
            </Stack>
          ))}
        </Stack>
      </InfiniteScroll>
    </div>
  );
}
