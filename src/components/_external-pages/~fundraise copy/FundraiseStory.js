import { useCallback, useState } from "react";
import * as Yup from "yup";
import moment from "moment";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { Form, FormikProvider, useFormik } from "formik";
import { LoadingButton } from "@material-ui/lab";
import { alpha, experimentalStyled as styled } from "@material-ui/core/styles";
import {
  Card,
  Grid,
  Stack,
  Button,
  Container,
  TextField,
  Typography,
  Autocomplete,
  FormHelperText,
  FormControlLabel,
  useTheme,
} from "@material-ui/core";
import {
  onBackStep,
  onNextStep,
  addPost,
  setCheckout,
} from "../../../redux/slices/fundraise";
import { QuillEditor } from "../../editor";
import { FundraiseHeader } from "../fundraise";
import fakeRequest from "../../../utils/fakeRequest";
import { useDispatch, useSelector } from "../../../redux/store";

// ----------------------------------------------------------------------

export default function FundraiseStory() {
  const theme = useTheme();
  const dispatch = useDispatch();
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

  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required("This is required"),
    description: Yup.mixed().required("This is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: checkout.title,
      description: checkout.description,
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await fakeRequest(500);
        resetForm();
        handleClosePreview();
        setSubmitting(false);
        enqueueSnackbar("Save success", { variant: "success" });
        dispatch(
          addPost({
            ...checkout,
            createdAt: moment(),
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
            <Grid container>
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
                      Tell your story
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
                      What’s your fundraiser title?
                    </Typography> */}

                    <TextField
                      fullWidth
                      size="small"
                      label="  What’s your fundraiser title?"
                      {...getFieldProps("title")}
                      error={Boolean(touched.title && errors.title)}
                      helperText={touched.title && errors.title}
                      onChange={(e) => {
                        dispatch(
                          setCheckout({ name: "title", value: e.target.value })
                        );
                        handleChange(e);
                      }}
                    />

                    {/* <Typography
                      variant="h5"
                      paragraph
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
                      Why are you fundraise?
                    </Typography> */}

                    <QuillEditor
                      id="product-content"
                      placeholder="Why are you fundraise?"
                      simple
                      value={values.description.content}
                      onChange={(content, delta, source, editor) => {
                        const text = editor.getText(content);

                        setFieldValue("description", {
                          content: content,
                          text: text,
                        });

                        dispatch(
                          setCheckout({
                            name: "description",
                            value: { content: content, text: text },
                          })
                        );
                      }}
                      error={Boolean(touched.description && errors.description)}
                    />
                    {touched.description && errors.description && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {touched.description && errors.description}
                      </FormHelperText>
                    )}

                    <Button variant="outlined" onClick={handleOpenPreview}>
                      Preview Fundraiser
                    </Button>
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
