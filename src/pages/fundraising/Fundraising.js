import { useEffect } from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { Link as RouterLink } from "react-router-dom";
import plusFill from "@iconify/icons-eva/plus-fill";
import checkmarkFill from "@iconify/icons-eva/checkmark-fill";
// material
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
  withStyles,
  experimentalStyled as styled,
} from "@material-ui/core/styles";
// redux
import { useDispatch, useSelector } from "../../redux/store";
import {
  getCart,
  createBilling,
  onNextStep,
  onBackStep,
  onGotoStep,
} from "../../redux/slices/fundraise";
// routes
import { PATH_DASHBOARD, PATH_PAGE } from "../../routes/paths";
// hooks
import useIsMountedRef from "../../hooks/useIsMountedRef";
// components
import Page from "../../components/Page";
import HeaderStepBreadcrumbs from "../../components/HeaderStepBreadcrumbs";
import {
  CheckoutCart,
  CheckoutPayment,
  CheckoutOrderComplete,
  CheckoutBillingAddress,
} from "../../components/_dashboard/e-commerce/checkout";
import {
  FundraisingType,
  FundraisingBasics,
  FundraisingGoal,
  FundraisingPhoto,
  FundraisingStory,
  FundraisingDonation,
  FundraisingShare,
  FundraisingDetails,
  FundraisingComplete,
} from "../../components/_external-pages/fundraising";
import { MHidden } from "src/components/@material-extend";

// ----------------------------------------------------------------------

const STEPS = ["Basics", "Goal", "Photo", "Story", "Donation"];

const QontoConnector = withStyles((theme) => ({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 20px)",
    right: "calc(50% + 20px)",
  },
  active: {
    "& $line": { borderColor: theme.palette.primary.main },
  },
  completed: {
    "& $line": { borderColor: theme.palette.primary.main },
  },
  line: {
    borderTopWidth: 2,
    borderColor: theme.palette.divider,
  },
}))(StepConnector);

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};

function QontoStepIcon({ active, completed }) {
  return (
    <Box
      sx={{
        zIndex: 9,
        width: 24,
        height: 24,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: active ? "primary.main" : "divider",
        bgcolor: "background.default",
      }}
    >
      {completed ? (
        <Box
          component={Icon}
          icon={checkmarkFill}
          sx={{ zIndex: 1, width: 20, height: 20, color: "primary.main" }}
        />
      ) : (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "currentColor",
          }}
        />
      )}
    </Box>
  );
}

export const NoteStyle = styled("div")({
  position: "fixed",
  width: 258,
  height: 472,
  right: 10,
  backgroundColor: "rgba(62, 180, 137, 0.1);",
});

export default function Fundraising() {
  const dispatch = useDispatch();
  const isMountedRef = useIsMountedRef();
  const { checkout } = useSelector((state) => state.fundraise);
  const { cart, billing, activeStep } = checkout;
  const isComplete = activeStep === STEPS.length + 2;

  useEffect(() => {
    if (isMountedRef.current) {
      dispatch(getCart(cart));
    }
  }, [dispatch, isMountedRef, cart]);

  useEffect(() => {
    if (activeStep === 1) {
      dispatch(createBilling(null));
    }
  }, [dispatch, activeStep]);

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const handleBackStep = () => {
    dispatch(onBackStep());
  };

  const handleGotoStep = (step) => {
    dispatch(onGotoStep(step));
  };

  return (
    <Page
      title="Fundraise"
      sx={{
        height: "100vh",
        paddingTop: (theme) => theme.spacing(theme.shape.PAGE_TOP_PADDING),
        paddingBottom: (theme) =>
          theme.spacing(theme.shape.PAGE_BOTTOM_PADDING),
        backgroundColor: (theme) => theme.palette.background.body,
      }}
    >
      <Container maxWidth="lg">
        <HeaderStepBreadcrumbs
          heading="Checkout"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            {
              name: "E-Commerce",
              href: PATH_DASHBOARD.eCommerce.root,
            },
            { name: "Checkout" },
          ]}
          cancelAction={
            activeStep === -1 ? (
              <Button variant="outlined" component={RouterLink} to={"/"}>
                Cancel
              </Button>
            ) : (
              <Button variant="outlined" onClick={handleBackStep}>
                Back
              </Button>
            )
          }
          continueAction={
            activeStep === 6 ? (
              <Button variant="contained" onClick={handleNextStep}>
                Share
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNextStep}>
                Continue
              </Button>
            )
          }
        />
      </Container>

      <Container maxWidth="md">
        <Grid container justifyContent={isComplete ? "center" : "flex-start"}>
          <Grid item xs={12} md={12} sx={{ mb: 0 }}>
            {activeStep > -1 && activeStep <= 4 && (
              <Stepper
                alternativeLabel
                activeStep={activeStep}
                connector={<QontoConnector />}
                sx={{ mb: 4 }}
              >
                {STEPS.map((label) => (
                  <Step key={label}>
                    <StepLabel
                      // StepIconComponent={QontoStepIcon}
                      sx={{
                        "& .MuiStepLabel-label": {
                          typography: "subtitle2",
                          color: "text.disabled",
                        },
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            )}
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth={activeStep === 6 ? "lg" : "md"}>
        {!isComplete ? (
          <>
            {activeStep === -1 && <FundraisingType />}
            {activeStep === 0 && <FundraisingBasics />}
            {activeStep === 1 && <FundraisingGoal />}
            {activeStep === 2 && <FundraisingPhoto />}
            {activeStep === 3 && <FundraisingStory />}
            {activeStep === 4 && <FundraisingDonation />}
            {activeStep === 5 && <FundraisingShare />}
            {activeStep === 6 && <FundraisingDetails />}
          </>
        ) : (
          <FundraisingComplete open={isComplete} />
        )}
      </Container>
    </Page>
  );
}
