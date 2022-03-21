import PropTypes from "prop-types";
import {
  Box,
  Grid,
  Step,
  Stepper,
  StepLabel,
  StepConnector,
} from "@material-ui/core";
import {
  withStyles,
  experimentalStyled as styled,
} from "@material-ui/core/styles";
import { useSelector } from "../redux/store";
import { STEPS } from "../utils/constants";

// ----------------------------------------------------------------------

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

HeaderStep.propTypes = {
  activeStep: PropTypes.number,
};

export default function HeaderStep() {
  const { checkout } = useSelector((state) => state.blog);
  const { activeStep } = checkout;
  const isComplete = activeStep === STEPS.length + 2;

  return (
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
  );
}
