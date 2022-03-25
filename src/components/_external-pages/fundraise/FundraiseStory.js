import PropTypes from "prop-types";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import moment from "moment";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "../../../redux/store";
import { Form, FormikProvider, useFormik } from "formik";
// material
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
// utils
import fakeRequest from "../../../utils/fakeRequest";
import { QuillEditor, DraftEditor } from "../../editor";
import {
  onBackStep,
  onNextStep,
  addPost,
  setCheckout,
} from "../../../redux/slices/fundraise";
import { FundraiseHeader } from "../fundraise";
import FundraiseNewPostPreview from "../fundraise/FundraiseNewPostPreview";
import { Quill } from "react-quill";
// ----------------------------------------------------------------------

FundraiseStory.propTypes = {
  id: PropTypes.string,
  activeStep: PropTypes.number,
  handleCheckout: PropTypes.func,
};

export default function FundraiseStory({ id, activeStep, handleCheckout }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { checkout } = useSelector((state) => state.fundraise);
  const isLight = theme.palette.mode === "light";
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [text3, setText3] = useState("");

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
    if (!checkout.isSave) {
      dispatch(
        addPost({
          ...checkout,
          createdAt: moment(),
        })
      );
      enqueueSnackbar("Save success", { variant: "success" });
      dispatch(setCheckout({ name: "isSave", value: true }));
    }

    dispatch(onNextStep());
  };

  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: checkout.title,
      description: checkout.description,
      cover: checkout.cover,
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await fakeRequest(500);
        resetForm();
        handleClosePreview();
        setSubmitting(false);
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
                      Tell your story
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
                      What’s your fundraiser title?
                    </Typography>

                    <TextField
                      fullWidth
                      size="small"
                      label=""
                      {...getFieldProps("title")}
                      error={Boolean(touched.title && errors.title)}
                      helperText={touched.title && errors.title}
                      onChange={(e) => {
                        handleCheckout({
                          id,
                          name: e.target.name,
                          value: e.target.value,
                        });
                        handleChange(e);
                      }}
                    />

                    <Typography
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
                    </Typography>

                    {/* <TextField
                      fullWidth
                      multiline
                      minRows={3}
                      maxRows={20}
                      label=""
                      {...getFieldProps("description")}
                      error={Boolean(touched.description && errors.description)}
                      helperText={touched.description && errors.description}
                      onChange={(e) => {
                        handleCheckout({
                          id,
                          name: e.target.name,
                          value: e.target.value,
                        });
                        handleChange(e);
                      }}
                    /> */}

                    {/* <DraftEditor
                      editorState={text3}
                      onEditorStateChange={(value) => setText3(value)}
                    /> */}

                    <QuillEditor
                      id="product-description"
                      simple
                      value={values.description}
                      onChange={(content, delta, source, editor) => {
                        const text = editor.getText(content);

                        setFieldValue("description", content);
                        handleCheckout({
                          name: "description",
                          value: content,
                        });
                        handleCheckout({
                          name: "descriptionText",
                          value: text,
                        });
                      }}
                      error={Boolean(touched.description && errors.description)}
                    />
                    {touched.description && errors.description && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {touched.description && errors.description}
                      </FormHelperText>
                    )}

                    <Button
                      // type="buttton"
                      variant="outlined"
                      onClick={handleOpenPreview}
                    >
                      Preview Fundraiser
                    </Button>
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Form>
      </FormikProvider>

      <FundraiseNewPostPreview
        formik={formik}
        openPreview={open}
        onClosePreview={handleClosePreview}
      />
    </>
  );
}
