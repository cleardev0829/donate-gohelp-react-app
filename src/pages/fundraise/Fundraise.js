import { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import {
  withStyles,
  experimentalStyled as styled,
} from "@material-ui/core/styles";
import {
  Box,
  Grid,
  Step,
  Button,
  Stepper,
  Container,
  StepLabel,
  StepConnector,
} from "@material-ui/core";
import {
  FundraiseType,
  FundraiseBasics,
  FundraiseGoal,
  FundraisePhoto,
  FundraiseStory,
  FundraiseDonation,
  FundraiseShare,
  FundraiseDetails,
  FundraiseComplete,
} from "../../components/_external-pages/fundraise";
import { setCheckout } from "../../redux/slices/blog";
import { useDispatch, useSelector } from "../../redux/store";
import { PATH_DASHBOARD, PATH_PAGE } from "../../routes/paths";
import Page from "../../components/Page";
import { STEPS } from "../../utils/constants";

// ----------------------------------------------------------------------

export const NoteStyle = styled("div")({
  position: "fixed",
  width: 258,
  height: 472,
  right: 10,
  backgroundColor: "rgba(62, 180, 137, 0.1);",
});

export default function Fundraise() {
  const dispatch = useDispatch();
  const { checkout } = useSelector((state) => state.blog);
  const { activeStep } = checkout;
  const isComplete = activeStep === STEPS.length + 2;

  const handleCheckout = ({ id, name, value }) => {
    dispatch(
      setCheckout({
        name,
        value,
      })
    );
  };

  return (
    <Page
      title="Fundraise"
      sx={{
        paddingTop: (theme) => theme.spacing(theme.shape.PAGE_TOP_PADDING),
        paddingBottom: (theme) =>
          theme.spacing(theme.shape.PAGE_BOTTOM_PADDING),
        backgroundColor: (theme) => theme.palette.background.body,
      }}
    >
      {!isComplete ? (
        <>
          {activeStep === -1 && <FundraiseType />}
          {activeStep === 0 && (
            <FundraiseBasics
              id="basics"
              activeStep={activeStep}
              handleCheckout={handleCheckout}
            />
          )}
          {activeStep === 1 && (
            <FundraiseGoal
              id="goal"
              activeStep={activeStep}
              handleCheckout={handleCheckout}
            />
          )}
          {activeStep === 2 && (
            <FundraisePhoto
              id="photo"
              activeStep={activeStep}
              handleCheckout={handleCheckout}
            />
          )}
          {activeStep === 3 && (
            <FundraiseStory
              id="story"
              activeStep={activeStep}
              handleCheckout={handleCheckout}
            />
          )}
          {activeStep === 4 && <FundraiseDonation />}
          {activeStep === 5 && (
            <FundraiseShare
              id="share"
              activeStep={activeStep}
              handleCheckout={handleCheckout}
            />
          )}
          {activeStep === 6 && <FundraiseDetails />}
        </>
      ) : (
        <FundraiseComplete open={isComplete} />
      )}
      {/* </Container> */}
    </Page>
  );
}
