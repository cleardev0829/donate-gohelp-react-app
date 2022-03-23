import PropTypes from "prop-types";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { useCallback, useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
// material
import { LoadingButton } from "@material-ui/lab";
import { alpha, experimentalStyled as styled } from "@material-ui/core/styles";

import {
  Card,
  Grid,
  Chip,
  Stack,
  Button,
  Switch,
  Select,
  Container,
  TextField,
  MenuItem,
  Typography,
  Autocomplete,
  FormHelperText,
  FormControlLabel,
  useTheme,
} from "@material-ui/core";
// utils
import fakeRequest from "../../../utils/fakeRequest";
import { useDispatch, useSelector } from "../../../redux/store";
import { onBackStep, onNextStep } from "../../../redux/slices/fundraise";
import { FundraiseHeader } from ".";
import { CRYPTO_TYPES } from "../../../utils/constants";

// ----------------------------------------------------------------------

FundraiseGoal.propTypes = {
  handleCheckout: PropTypes.func,
};

export default function FundraiseGoal({ handleCheckout }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { checkout } = useSelector((state) => state.fundraise);
  const isLight = theme.palette.mode === "light";
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const handleBackStep = () => {
    dispatch(onBackStep());
  };

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const Schema = Yup.object().shape({
    // cryptoType: Yup.string().required("This is required"),
    goal: Yup.number().required("This is required"),
  });

  const formik = useFormik({
    initialValues: {
      // cryptoType: checkout.cryptoType,
      goal: checkout.goal,
    },
    validationSchema: Schema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await fakeRequest(500);
        resetForm();
        handleClosePreview();
        setSubmitting(false);
        // enqueueSnackbar("success", { variant: "success" });
        handleNextStep();
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    },
  });

  const {
    errors,
    values,
    touched,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    getFieldProps,
    handleChange,
  } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <FundraiseHeader
            cancelAction={handleBackStep}
            continueAction={handleSubmit}
          />
          <Container maxWidth="md">
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card
                  sx={{
                    p: theme.shape.CARD_PADDING,
                  }}
                >
                  <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
                    <Typography
                      variant="h3"
                      sx={{
                        ...(!isLight && {
                          textShadow: (theme) =>
                            `4px 4px 16px ${alpha(
                              theme.palette.grey[800],
                              0.48
                            )}`,
                        }),
                      }}
                    >
                      Set your fundraise goal
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        ...(!isLight && {
                          textShadow: (theme) =>
                            `4px 4px 16px ${alpha(
                              theme.palette.grey[800],
                              0.48
                            )}`,
                        }),
                      }}
                    >
                      We're here to guide you through your fundraise journey.
                    </Typography>

                    <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
                      {/* <Typography
                        variant="h5"
                        sx={{
                          ...(!isLight && {
                            textShadow: (theme) =>
                              `4px 4px 16px ${alpha(
                                theme.palette.grey[800],
                                0.48
                              )}`,
                          }),
                        }}
                      >
                        Select crypto type.
                      </Typography>

                      <TextField
                        fullWidth
                        size="small"
                        label=""
                        {...getFieldProps("cryptoType")}
                        error={Boolean(touched.cryptoType && errors.cryptoType)}
                        helperText={touched.cryptoType && errors.cryptoType}
                        select
                        onChange={(e) => {
                          handleCheckout({
                            id,
                            name: e.target.name,
                            value: e.target.value,
                          });
                          handleChange(e);
                        }}
                      >
                        {CRYPTO_TYPES.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField> */}

                      <Typography
                        variant="h5"
                        sx={{
                          ...(!isLight && {
                            textShadow: (theme) =>
                              `4px 4px 16px ${alpha(
                                theme.palette.grey[800],
                                0.48
                              )}`,
                          }),
                        }}
                      >
                        How much would you like to raise?
                      </Typography>

                      <TextField
                        fullWidth
                        size="small"
                        label=""
                        {...getFieldProps("goal")}
                        error={Boolean(touched.goal && errors.goal)}
                        helperText={touched.goal && errors.goal}
                        onFocus={(e) => {
                          e.target.select();
                        }}
                        onChange={(e) => {
                          handleCheckout({
                            name: e.target.name,
                            value: e.target.value,
                          });
                          handleChange(e);
                        }}
                      />
                    </Stack>

                    <Typography
                      variant="p1"
                      sx={{
                        ...(!isLight && {
                          textShadow: (theme) =>
                            `4px 4px 16px ${alpha(
                              theme.palette.grey[800],
                              0.48
                            )}`,
                        }),
                      }}
                    >
                      Keep in mind that transaction fees, including credit and
                      debit charges, are deducated from each donation.
                    </Typography>
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Form>
      </FormikProvider>
      {/* <BlogNewPostPreview formik={formik} openPreview={open} onClosePreview={handleClosePreview} /> */}
    </>
  );
}
