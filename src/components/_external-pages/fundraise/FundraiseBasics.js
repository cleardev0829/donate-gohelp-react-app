import * as Yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";
import _ from "lodash";
import { alpha, useTheme } from "@material-ui/core/styles";

import {
  Box,
  Card,
  Grid,
  Stack,
  Container,
  TextField,
  MenuItem,
  Typography,
} from "@material-ui/core";

import fakeRequest from "../../../utils/fakeRequest";
import { useDispatch, useSelector } from "../../../redux/store";
import {
  onBackStep,
  onNextStep,
  setCheckout,
} from "../../../redux/slices/fundraise";
import { FundraiseHeader } from ".";
import { CATEGORIES } from "../../../utils/constants";
import countries from "./countries";
import ReactCountryFlag from "react-country-flag";

// ----------------------------------------------------------------------

export default function FundraiseBasics() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { checkout } = useSelector((state) => state.fundraise);
  const isLight = theme.palette.mode === "light";

  const handleBackStep = () => {
    dispatch(onBackStep());
  };

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const NewBlogSchema = Yup.object().shape({
    live: Yup.mixed().required("This is required"),
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
        setSubmitting(false);
        dispatch(
          setCheckout({
            name: "live",
            value: values.live,
          })
        );
        dispatch(
          setCheckout({
            name: "category",
            value: values.category,
          })
        );
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
            <Grid container spacing={theme.shape.MAIN_VERTICAL_SPACING}>
              <Grid item xs={12} md={12}>
                <Card
                  sx={{
                    p: theme.shape.CARD_PADDING,
                  }}
                >
                  <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
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
                      Let’s start with the basic
                    </Typography>

                    <Typography
                      variant="body2"
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

                    {/* <Typography
                      variant="subtitle1"
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
                    </Typography> */}

                    <TextField
                      fullWidth
                      size="small"
                      label="Where do you live?"
                      {...getFieldProps("live")}
                      error={Boolean(touched.live && errors.live)}
                      helperText={touched.live && errors.live}
                      select
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    >
                      {countries.map((option) => (
                        <MenuItem key={option.code} value={option}>
                          <ReactCountryFlag
                            countryCode={option.code}
                            svg
                            style={{
                              // width: "2em",
                              // height: "2em",
                              marginRight: 10,
                            }}
                          />
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    {/* <Typography
                      variant="on Monday 4 April from 11:00 or at 11:30 (Swedish time)"
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
                    </Typography> */}

                    <TextField
                      fullWidth
                      size="small"
                      label="What are you fundraise for?"
                      {...getFieldProps("category")}
                      error={Boolean(touched.category && errors.category)}
                      helperText={touched.category && errors.category}
                      select
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    >
                      {_.orderBy(
                        CATEGORIES,
                        [(item) => item.toLowerCase()],
                        ["asc"]
                      ).map((option) => (
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
                  variant="subtitle2"
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
          </Container>
        </Form>
      </FormikProvider>
    </>
  );
}
