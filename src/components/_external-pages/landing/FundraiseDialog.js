import { useState } from "react";
import * as Yup from "yup";
import moment from "moment";
import { isString } from "lodash";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { motion } from "framer-motion";
import { LoadingButton } from "@material-ui/lab";
import { Form, FormikProvider, useFormik } from "formik";
import {
  alpha,
  useTheme,
  experimentalStyled as styled,
} from "@material-ui/core/styles";
import {
  Box,
  Stack,
  Button,
  Divider,
  TextField,
  Container,
  Typography,
  CardContent,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import {
  FundraiseType,
  FundraiseStory,
  FundraisePhoto,
  FundraiseBasics,
  FundraisePreview,
} from "../fundraise";
import {
  varFadeIn,
  varFadeInUp,
  varWrapEnter,
  varFadeInRight,
  MotionInView,
} from "../../animate";
import Markdown from "../../Markdown";
import Scrollbar from "../../Scrollbar";
import { DonateDonation } from "../donate";
import { DialogAnimate } from "../../animate";
import EmptyContent from "../../EmptyContent";
import fakeRequest from "../../../utils/fakeRequest";
import { useDispatch, useSelector } from "../../../redux/store";
import { onBackStep, onNextStep } from "../../../redux/slices/fundraise";

// ----------------------------------------------------------------------

FundraiseDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default function FundraiseDialog({ open, onClose }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const isLight = theme.palette.mode === "light";
  const { checkout } = useSelector((state) => state.fundraise);
  const { activeStep } = checkout;

  return (
    <DialogAnimate maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>
        <MotionInView variants={varFadeInUp}>
          <Typography
            variant="h5"
            paragraph
            sx={{
              ...(!isLight && {
                textShadow: (theme) =>
                  `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`,
              }),
            }}
          >
            {activeStep === 0 && "Who are you fundraise for?"}
            {activeStep === 1 && "Let’s start with the basic"}
            {activeStep === 2 && "Add a cover photo or video"}
            {activeStep === 3 && "Tell your story"}
            {activeStep === 4 && checkout.title}
          </Typography>
        </MotionInView>
      </DialogTitle>

      <Divider />

      <DialogContent>
        {activeStep === 0 && <FundraiseType />}
        {activeStep === 1 && <FundraiseBasics />}
        {activeStep === 2 && <FundraisePhoto />}
        {activeStep === 3 && <FundraiseStory />}
        {activeStep === 4 && <FundraisePreview onClose={onClose} />}
      </DialogContent>

      {activeStep === 0 && (
        <DialogActions disableSpacing={true}>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      )}
    </DialogAnimate>
  );
}
