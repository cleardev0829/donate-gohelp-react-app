import { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { orderBy } from "lodash";
import moment from "moment";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import {
  useTheme,
  experimentalStyled as styled,
} from "@material-ui/core/styles";
import {
  Box,
  Link,
  Card,
  Grid,
  Stack,
  Avatar,
  Button,
  Typography,
  CardContent,
} from "@material-ui/core";
import {
  varFadeIn,
  varFadeInUp,
  varWrapEnter,
  varFadeInRight,
} from "../../animate";
import {
  onNextStep,
  getDonatesInitial,
  getMoreDonates,
} from "../../../redux/slices/donate";
import { diff } from "../../../utils/constants";
import { IconBullet } from "src/layouts/dashboard/MenuDesktop";
import { useDispatch, useSelector } from "../../../redux/store";
import OutlineCard from "src/components/OutlineCard";

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

// ----------------------------------------------------------------------

DonateList.propTypes = {
  post: PropTypes.object,
};

export default function DonateList({ post }) {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const theme = useTheme();
  const { donates, hasMore, index, step } = useSelector(
    (state) => state.donate
  );
  const [filters, setFilters] = useState("latest");
  const [data, setData] = useState(donates);

  useEffect(() => {
    dispatch(getDonatesInitial(id, index, step));
  }, [dispatch, index, step]);

  useEffect(() => {
    const sortedPosts = applySort(donates, filters);
    setData(sortedPosts);
  }, [donates]);

  const handleGetMoreDonates = () => {
    dispatch(getMoreDonates());
  };

  return (
    <Box>
      <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
        <OutlineCard>
          <CardContent>
            <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
              <Typography variant="h5">{`Words of support (${data.length})`}</Typography>

              {data.map((donate, index) => (
                <Stack
                  direction="row"
                  spacing={theme.shape.CARD_CONTENT_SPACING}
                >
                  {/* <Avatar
                    key={donate.id}
                    alt={donate.id}
                    src={" /static/avatars/avatar_man.png"}
                  /> */}
                  <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={theme.shape.MAIN_HORIZONTAL_SPACING}
                    >
                      <Link variant="subtitle2" sx={{ color: "text.primary" }}>
                        {`Support ${index + 1}`}
                      </Link>
                      <Stack direction="row" alignItems="center">
                        <IconBullet />
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.disabled"
                        >
                          {diff(moment(), moment(donate.createdAt))}
                        </Typography>
                      </Stack>
                    </Stack>

                    <Typography
                      component="span"
                      variant="subtitle2"
                      color="text.disabled"
                    >
                      {donate.message}
                    </Typography>

                    {index === donates.length - 1 && hasMore && (
                      <motion.div variants={varFadeInRight}>
                        <Button
                          variant="outlined"
                          onClick={handleGetMoreDonates}
                        >
                          Show more
                        </Button>
                      </motion.div>
                    )}
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </CardContent>
        </OutlineCard>

        <Stack direction="row" justifyContent="space-between">
          <Grid container spacing={theme.shape.MAIN_HORIZONTAL_SPACING}>
            <Grid item xs="12" md="6">
              <motion.div variants={varFadeInRight}>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: "text.disabled" }}
                >
                  Please donate to share words of encouragement.
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs="12" md="6">
              <motion.div variants={varFadeInRight}>
                <Button
                  fullWidth
                  variant="outlined"
                  // component={RouterLink}
                  // to={PATH_PAGE.donate_payment}
                  onClick={() => dispatch(onNextStep())}
                >
                  Donate Now
                </Button>
              </motion.div>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Box>
  );
}
