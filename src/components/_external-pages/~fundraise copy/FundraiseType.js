import { useEffect } from "react";
import { useDispatch, useSelector } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import faker from "faker";
import {
  alpha,
  experimentalStyled as styled,
  useTheme,
} from "@material-ui/core/styles";
import { Container, Grid, Typography } from "@material-ui/core";
import {
  varFadeIn,
  varFadeInUp,
  varWrapEnter,
  varFadeInRight,
  MotionInView,
} from "../../animate";
import { motion } from "framer-motion";
import {
  onNextStep,
  onGotoStep,
  setCheckout,
} from "../../../redux/slices/fundraise";
import { FundraiseTypeCard, FundraiseHeader } from ".";

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

  const handleType = (type) => {
    dispatch(
      setCheckout({
        name: "type",
        value: type,
      })
    );
  };

  const handleBackStep = () => {
    navigate("/");
  };

  const handleNextStep = () => {
    dispatch(onNextStep());
    // dispatch(onGotoStep(4));
  };

  const handleContinue = () => {
    if (checkout.type === null) {
      enqueueSnackbar("Please select who you fundraise for", {
        variant: "error",
      });
      return;
    }

    handleNextStep();
  };

  return (
    <>
      <FundraiseHeader
        cancelTitle="Cancel"
        cancelAction={handleBackStep}
        continueAction={handleContinue}
      />
      <Container maxWidth={"md"}>
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
              Hi there, Who are you fundraise for?
            </Typography>
          </MotionInView>
        </ContentStyle>

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
      </Container>
    </>
  );
}
