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
import { setCheckout } from "../../redux/slices/fundraise";
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
  const { checkout } = useSelector((state) => state.fundraise);
  const { activeStep } = checkout;
  const isComplete = activeStep === STEPS.length + 2;

  const handleCheckout = ({ name, value }) => {
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
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      {!isComplete ? (
        <>
          {activeStep === -1 && <FundraiseType />}
          {activeStep === 0 && <FundraiseBasics />}
          {activeStep === 1 && <FundraiseGoal />}
          {activeStep === 2 && <FundraisePhoto />}
          {activeStep === 3 && <FundraiseStory />}
          {activeStep === 4 && <FundraiseDonation />}
          {activeStep === 5 && (
            <FundraiseShare
              uid={checkout.uid}
              title={checkout.title}
              isStepBar={true}
            />
          )}
          {activeStep === 6 && <FundraiseDetails uid={checkout.uid} />}
        </>
      ) : (
        <FundraiseComplete open={isComplete} />
      )}
      {/* </Container> */}
    </Page>
  );
}
