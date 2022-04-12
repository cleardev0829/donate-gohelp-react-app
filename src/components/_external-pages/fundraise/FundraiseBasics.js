import _ from "lodash";
import * as Yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";
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
  InputAdornment,
} from "@material-ui/core";
import {
  onBackStep,
  onNextStep,
  setCheckout,
} from "../../../redux/slices/fundraise";
import countries from "./countries";
import FundraiseFooter from "./FundraiseFooter";
import ReactCountryFlag from "react-country-flag";
import fakeRequest from "../../../utils/fakeRequest";
import { CATEGORIES } from "../../../utils/constants";
import { useDispatch, useSelector } from "../../../redux/store";

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
    goal: Yup.number().min(1000).required("This is required"),
  });

  const formik = useFormik({
    initialValues: {
      live: checkout.live ? checkout.live.code : "",
      category: checkout.category,
      goal: checkout.goal,
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
            value: _.filter(
              countries,
              (country) => country.code === values.live
            )[0],
          })
        );
        dispatch(
          setCheckout({
            name: "category",
            value: values.category,
          })
        );
        dispatch(
          setCheckout({
            name: "goal",
            value: parseFloat(values.goal),
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
          <Grid container spacing={theme.shape.MAIN_VERTICAL_SPACING}>
            <Grid item xs={12} md={12}>
              <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
                <Stack
                  direction="row"
                  justifyContent={"space-between"}
                  alignItems="center"
                >
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
                    Where do you live?
                  </Typography>
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
                    sx={{ width: 300 }}
                  >
                    {countries.map((option) => (
                      <MenuItem key={option.code} value={option.code}>
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
                </Stack>

                <Stack
                  direction="row"
                  justifyContent={"space-between"}
                  alignItems="center"
                >
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
                    What are you fundraise for?
                  </Typography>

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
                    sx={{ maxWidth: 300 }}
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

                <Stack
                  direction="row"
                  justifyContent={"space-between"}
                  alignItems="center"
                >
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
                    How much would you like to raise?
                  </Typography>

                  <TextField
                    fullWidth
                    size="small"
                    label="How much would you like to raise?"
                    {...getFieldProps("goal")}
                    error={Boolean(touched.goal && errors.goal)}
                    helperText={touched.goal && errors.goal}
                    onFocus={(e) => {
                      e.target.select();
                    }}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
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
                            $
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ maxWidth: 300 }}
                  />
                </Stack>
              </Stack>
              {/* </Card> */}
            </Grid>

            <Grid item xs={12} md={12} sx={{ textAlign: "left" }}>
              <Typography
                variant="body2"
                sx={{
                  color: "text.disabled",
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

          <FundraiseFooter
            cancelAction={handleBackStep}
            continueAction={handleSubmit}
          />
        </Form>
      </FormikProvider>
    </>
  );
}
