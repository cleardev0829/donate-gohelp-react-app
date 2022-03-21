import PropTypes from "prop-types";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
// material
import { LoadingButton } from "@material-ui/lab";
import {
  alpha,
  experimentalStyled as styled,
  useTheme,
} from "@material-ui/core/styles";

import {
  Box,
  Card,
  Grid,
  Stack,
  Container,
  TextField,
  MenuItem,
  Typography,
  FormHelperText,
} from "@material-ui/core";

import fakeRequest from "../../../utils/fakeRequest";
import { useDispatch, useSelector } from "../../../redux/store";
import { onBackStep, onNextStep } from "../../../redux/slices/blog";
import { FundraiseHeader } from ".";
import { CATEGORIES, COUNTRIES } from "../../../utils/constants";

// ----------------------------------------------------------------------

FundraiseBasics.propTypes = {
  id: PropTypes.string,
  activeStep: PropTypes.number,
  handleCheckout: PropTypes.func,
};

export default function FundraiseBasics({ id, activeStep, handleCheckout }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { checkout } = useSelector((state) => state.blog);
  const isLight = theme.palette.mode === "light";
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setFieldValue("category", checkout.category);
  }, [checkout]);

  const handleClosePreview = () => {
    setOpen(false);
  };

  const handleBackStep = () => {
    dispatch(onBackStep());
  };

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const NewBlogSchema = Yup.object().shape({
    live: Yup.string().required("This is required"),
    category: Yup.string().required("This is required"),
  });

  const formik = useFormik({
    initialValues: {
      live: checkout.live,
      category: checkout.category,
    },
    validationSchema: NewBlogSchema,
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
                      Let’s start with the basic
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
                      Where do you live?
                    </Typography>

                    <TextField
                      fullWidth
                      size="small"
                      label=""
                      {...getFieldProps("live")}
                      error={Boolean(touched.live && errors.live)}
                      helperText={touched.live && errors.live}
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
                      {COUNTRIES.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.value}
                        </MenuItem>
                      ))}
                    </TextField>

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
                      What are you fundraise for?
                    </Typography>

                    <TextField
                      fullWidth
                      size="small"
                      label=""
                      {...getFieldProps("category")}
                      error={Boolean(touched.category && errors.category)}
                      helperText={touched.category && errors.category}
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
                      {CATEGORIES.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Stack>
                </Card>
              </Grid>

              <Grid item xs={12} md={12} sx={{ textAlign: "center" }}>
                <Typography
                  variant="p1"
                  sx={{
                    ...(!isLight && {
                      textShadow: (theme) =>
                        `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`,
                    }),
                  }}
                >
                  By continuing, you agree to the GoFundMe terms and privacy
                  policy.
                </Typography>
              </Grid>
            </Grid>
            {/* {errors.category && (
              <FormHelperText error>
                <Box component="span" sx={{ px: 2 }}>
                  {touched.category && errors.category}
                </Box>
              </FormHelperText>
            )} */}
          </Container>
        </Form>
      </FormikProvider>
    </>
  );
}
