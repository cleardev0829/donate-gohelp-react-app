import PropTypes from "prop-types";
import * as Yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";
import { alpha } from "@material-ui/core/styles";
import {
  Card,
  Grid,
  Stack,
  Container,
  TextField,
  Typography,
  InputAdornment,
  useTheme,
} from "@material-ui/core";
import fakeRequest from "../../../utils/fakeRequest";
import { useDispatch, useSelector } from "../../../redux/store";
import {
  onBackStep,
  onNextStep,
  setCheckout,
} from "../../../redux/slices/fundraise";
import { FundraiseHeader } from ".";

// ----------------------------------------------------------------------

export default function FundraiseGoal() {
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

  const Schema = Yup.object().shape({
    goal: Yup.number().min(1000).required("This is required"),
  });

  const formik = useFormik({
    initialValues: {
      goal: checkout.goal,
    },
    validationSchema: Schema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await fakeRequest(500);
        resetForm();
        setSubmitting(false);
        dispatch(
          setCheckout({
            name: "goal",
            value: values.goal,
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
                          handleChange(e);
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">
                              <Typography
                                variant="h5"
                                // sx={{
                                //   ...(!isLight && {
                                //     textShadow: (theme) =>
                                //       `4px 4px 16px ${alpha(
                                //         theme.palette.grey[800],
                                //         0.48
                                //       )}`,
                                //   }),
                                // }}
                              >
                                $
                              </Typography>
                            </InputAdornment>
                          ),
                        }}
                        varia
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
    </>
  );
}
