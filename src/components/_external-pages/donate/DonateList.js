import { useDispatch, useSelector } from "../../../redux/store";
import PropTypes from "prop-types";
import { orderBy } from "lodash";
import { Icon } from "@iconify/react";
import lodash from "lodash";
import pinFill from "@iconify/icons-eva/pin-fill";
import emailFill from "@iconify/icons-eva/email-fill";
import roundBusinessCenter from "@iconify/icons-ic/round-business-center";
// material
import {
  experimentalStyled as styled,
  useTheme,
} from "@material-ui/core/styles";
import {
  Box,
  Link,
  Card,
  Grid,
  Avatar,
  Button,
  Typography,
  CardHeader,
  Stack,
} from "@material-ui/core";
import { motion } from "framer-motion";
import moment from "moment";
import { Link as RouterLink, useParams } from "react-router-dom";
import { PATH_DASHBOARD, PATH_PAGE } from "../../../routes/paths";
import {
  varFadeIn,
  varFadeInUp,
  varWrapEnter,
  varFadeInRight,
} from "../../animate";
import { IconBullet } from "src/layouts/dashboard/MenuDesktop";
import {
  onNextStep,
  getDonatesInitial,
  getMoreDonates,
} from "../../../redux/slices/donate";
import { diff } from "../../../utils/constants";
import { useEffect, useState } from "react";

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
        <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
          <Card
            sx={{
              backgroundColor: "background.default",
              border: "1px solid #F3F3F3",
              p: (theme) => theme.shape.CARD_PADDING,
            }}
          >
            <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
              <Typography variant="h4">{`Words of support (${data.length})`}</Typography>

              {data.map((donate, index) => (
                <Stack
                  direction="row"
                  spacing={theme.shape.CARD_CONTENT_SPACING}
                >
                  <Avatar
                    key={donate.id}
                    alt={donate.id}
                    src={" /static/avatars/avatar_man.png"}
                  />
                  <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={theme.shape.MAIN_HORIZONTAL_SPACING}
                    >
                      <Link variant="h4" sx={{ color: "text.primary" }}>
                        {`Support ${index + 1}`}
                      </Link>
                      <Stack direction="row" alignItems="center">
                        <IconBullet />
                        <Typography
                          component="span"
                          variant="subtitle1"
                          color="text.primary"
                        >
                          {diff(moment(), moment(donate.createdAt))}
                        </Typography>
                      </Stack>
                    </Stack>

                    <Typography
                      component="span"
                      variant="subtitle1"
                      color="text.primary"
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
          </Card>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Grid container spacing={theme.shape.MAIN_HORIZONTAL_SPACING}>
            <Grid item xs="12" md="6">
              <motion.div variants={varFadeInRight}>
                <Typography component="span" variant="h7">
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
