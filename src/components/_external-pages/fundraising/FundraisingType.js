import { sum } from "lodash";
import { Icon } from "@iconify/react";
import { Link as RouterLink } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
import arrowIosBackFill from "@iconify/icons-eva/arrow-ios-back-fill";
import { alpha, experimentalStyled as styled } from "@material-ui/core/styles";

// material
import {
  Container,
  Grid,
  Card,
  Button,
  CardHeader,
  Typography,
  useTheme,
} from "@material-ui/core";
// redux
import { useDispatch, useSelector } from "../../../redux/store";
import {
  deleteCart,
  onNextStep,
  applyDiscount,
  increaseQuantity,
  decreaseQuantity,
  applyType,
} from "../../../redux/slices/fundraise";
// routes
import { PATH_DASHBOARD, PATH_PAGE } from "../../../routes/paths";
//
import Scrollbar from "../../Scrollbar";
import EmptyContent from "../../EmptyContent";

import {
  varFadeIn,
  varFadeInUp,
  varWrapEnter,
  varFadeInRight,
  MotionInView,
} from "../../animate";
import { motion } from "framer-motion";
import { FundraisingTypeCard } from ".";
// ----------------------------------------------------------------------

const IMG = (index) =>
  `/static/select_fundraising/select_fundraising_${index}.png`;

const TITLES = ["Yourself or someone else", "A charity"];

const DESCRIPTIONS = [
  "Donations will be deposited into a personal or business bank account.",
  "Donation will be automatically delivered to your chosen cherity.",
];

const posts = [...Array(2)].map((_, index) => {
  const setIndex = index + 1;
  return {
    id: `0feb2990-4210-4170-93a4-37e8f5958a18-${setIndex}`,
    cover: IMG(setIndex),
    title: TITLES[index],
    description: DESCRIPTIONS[index],
  };
});

const RootStyle = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(5),
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
  marginBottom: theme.spacing(8),
  padding: 0,
}));

export default function FundraisingType() {
  const dispatch = useDispatch();
  const { checkout } = useSelector((state) => state.fundraise);
  const { cart, total, discount, subtotal, type } = checkout;
  const isEmptyCart = cart.length === 0;
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  const handleApplyType = (index) => {
    dispatch(applyType(index));
  };

  return (
    <RootStyle>
      <Container>
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
              Hi there, Who are you fundraising for?
            </Typography>
          </MotionInView>
        </ContentStyle>

        <Grid container spacing={5}>
          {posts.map((post, index) => (
            <FundraisingTypeCard
              key={post.id}
              post={post}
              index={index}
              type={type}
              onClick={handleApplyType}
            />
          ))}
        </Grid>
      </Container>
    </RootStyle>
  );
}
