import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "../../../redux/store";
import InfiniteScroll from "react-infinite-scroll-component";
import { orderBy } from "lodash";
import { motion } from "framer-motion";
import { alpha, experimentalStyled as styled } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  Box,
  Skeleton,
  Stack,
  Container,
  Typography,
  useTheme,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { OnlineFundraiseCard } from "../landing";

// ----------------------------------------------------------------------

const IMG = (index) => `/static/donate_supports/donate_support_${index}.png`;

const TITLES = [
  "Number 1 fundraise platform",
  "GoHelp Guarantee",
  "Expert advice",
];

const DESCRIPTIONS = [
  " More people start fundraisers on GoFundMe than on any other platform.",
  "In the rare case something isn’t right, we will work with you to determine if misuse occurred.",
  "Contact us with your questions and we’ll answer, day or night.",
];

const LINKS = [
  "Learn how GoHelp works.",
  "Learn about the GoHelp Guarantee.",
  "Get expert advice. Visit our Help Center.",
];

const posts = [...Array(3)].map((_, index) => {
  const setIndex = index + 1;
  return {
    id: `0feb2990-4210-4170-93a4-37e8f5958a18-${setIndex}`,
    cover: IMG(setIndex),
    title: TITLES[index],
    description: DESCRIPTIONS[index],
    link: LINKS[index],
  };
});
// ----------------------------------------------------------------------

export default function OnlineFundraise() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  return (
    <Box sx={{ py: 12 }}>
      <Grid container spacing={5}>
        {posts.map((post, index) => (
          <OnlineFundraiseCard key={post.id} post={post} index={index} />
        ))}
      </Grid>
    </Box>
  );
}
