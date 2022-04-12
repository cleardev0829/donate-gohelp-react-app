import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import faker from "faker";
import { motion } from "framer-motion";
import { useSnackbar } from "notistack";
import {
  alpha,
  useTheme,
  experimentalStyled as styled,
} from "@material-ui/core/styles";
import { Grid, Container, Typography } from "@material-ui/core";
import {
  varFadeIn,
  varFadeInUp,
  varWrapEnter,
  varFadeInRight,
  MotionInView,
} from "../../animate";
import {
  onNextStep,
  onGotoStep,
  setCheckout,
} from "../../../redux/slices/fundraise";
import { FundraiseTypeCard } from ".";
import { useDispatch, useSelector } from "../../../redux/store";

// ----------------------------------------------------------------------

const TITLES = ["Yourself or someone else", "A charity"];

const DESCRIPTIONS = [
  "Donations will be deposited into a personal or business bank account.",
  "Donation will be automatically delivered to your chosen cherity.",
];

const posts = [...Array(2)].map((_, index) => {
  const setIndex = index + 1;
  return {
    id: `0feb2990-4210-4170-93a4-37e8f5958a18-${setIndex}`,
    cover: `/static/select_fundraise/select_fundraise_${setIndex}.png`,
    title: TITLES[index],
    description: DESCRIPTIONS[index],
  };
});

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

export default function FundraiseType() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const { checkout } = useSelector((state) => state.fundraise);
  const isLight = theme.palette.mode === "light";

  useEffect(() => {
    dispatch(setCheckout({ name: "uid", value: faker.datatype.uuid() }));
  }, [dispatch]);

  const handleBackStep = () => {
    navigate("/");
  };

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const handleType = (type) => {
    dispatch(
      setCheckout({
        name: "type",
        value: type,
      })
    );
    handleNextStep();
  };

  return (
    <Grid container spacing={5}>
      {posts.map((post, index) => (
        <FundraiseTypeCard
          key={post.id}
          post={post}
          index={index}
          type={checkout.type}
          onClick={() => handleType(index)}
        />
      ))}
    </Grid>
  );
}
