import { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import moment from "moment";
import { orderBy } from "lodash";
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
  Divider,
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
import OutlineCard from "../../../components/OutlineCard";
import { IconBullet } from "src/layouts/dashboard/MenuDesktop";
import { useDispatch, useSelector } from "../../../redux/store";

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

DonateList.propTypes = {};

export default function DonateList() {
  const theme = useTheme();
  const params = useParams();
  const dispatch = useDispatch();
  const [filters, setFilters] = useState("latest");
  const { donates, hasMore, index, step } = useSelector(
    (state) => state.donate
  );
  const [data, setData] = useState(donates);
  const { post, isLoading } = useSelector((state) => state.fundraise);

  useEffect(() => {
    dispatch(getDonatesInitial(params.id, index, step));
  }, [dispatch, index, step, params]);

  useEffect(() => {
    const sortedPosts = applySort(donates, filters);
    setData(sortedPosts);
  }, [donates]);

  const handleGetMoreDonates = () => {
    dispatch(getMoreDonates());
  };

  return (
    <Box>
      <OutlineCard>
        <CardContent>
          <Typography variant="h5">{`Words of support (${data.length})`}</Typography>
        </CardContent>
        <Divider />

        {/* <Stack spacing={theme.shape.CARD_CONTENT_SPACING}> */}
        {data.map((donate, index) => (
          <Box key={`box-${index}`}>
            <CardContent key={`cardcontent-${index}`}>
              <Stack
                key={`stack-1-${index}`}
                direction="row"
                spacing={theme.shape.CARD_CONTENT_SPACING}
              >
                {/* <Avatar
                    key={donate.id}
                    alt={donate.id}
                    src={" /static/avatars/avatar_man.png"}
                  /> */}
                <Stack
                  key={`stack-2-${index}`}
                  spacing={theme.shape.CARD_CONTENT_SPACING}
                >
                  <Stack
                    key={`stack-3-${index}`}
                    direction="row"
                    alignItems="center"
                    spacing={theme.shape.MAIN_HORIZONTAL_SPACING}
                  >
                    <Link
                      key={`link-${index}`}
                      variant="subtitle2"
                      sx={{ color: "text.primary" }}
                    >
                      {`Support ${index + 1}`}
                    </Link>
                    <Stack
                      key={`stack-4-${index}`}
                      direction="row"
                      alignItems="center"
                    >
                      <IconBullet key={`iconbullet-${index}`} />
                      <Typography
                        key={`typography-1-${index}`}
                        component="span"
                        variant="body2"
                        color="text.disabled"
                      >
                        {diff(moment(), moment(donate.createdAt))}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Typography
                    key={`typography-2-${index}`}
                    component="span"
                    variant="subtitle2"
                    color="text.disabled"
                  >
                    {donate.message}
                  </Typography>

                  {index === donates.length - 1 && hasMore && (
                    <motion.div
                      key={`motion-div-${index}`}
                      variants={varFadeInRight}
                    >
                      <Button
                        key={`button-${index}`}
                        variant="outlined"
                        onClick={handleGetMoreDonates}
                      >
                        Show more
                      </Button>
                    </motion.div>
                  )}
                </Stack>
              </Stack>
            </CardContent>
            {index < data.length - 1 && <Divider key={`divider-${index}`} />}
          </Box>
        ))}
        {/* </Stack> */}
      </OutlineCard>
    </Box>
  );
}
