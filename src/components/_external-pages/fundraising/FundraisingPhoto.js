import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { useCallback, useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
// material
import { LoadingButton } from "@material-ui/lab";
import { alpha, experimentalStyled as styled } from "@material-ui/core/styles";

import {
  Box,
  Card,
  Grid,
  Chip,
  Stack,
  Button,
  Switch,
  Select,
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
//
import { QuillEditor } from "../../editor";
import { UploadSingleFileOverride } from "../../upload";
import { useDispatch, useSelector } from "../../../redux/store";

// import BlogNewPostPreview from "./BlogNewPostPreview";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

FundraisingPhoto.propTypes = {
  id: PropTypes.string,
  activeStep: PropTypes.number,
  handleCheckout: PropTypes.func,
};

export default function FundraisingPhoto({ id, activeStep, handleCheckout }) {
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

  const NewBlogSchema = Yup.object().shape({
    file: Yup.string().required("This is required"),
    description: Yup.string().required("Description is required"),
    content: Yup.string().min(1000).required("Content is required"),
    cover: Yup.mixed().required("Cover is required"),
  });

  const formik = useFormik({
    initialValues: {
      file: checkout.file,
      description: "",
      content: "",
      cover: checkout.file
        ? {
            ...checkout.file,
            preview: URL.createObjectURL(checkout.file),
          }
        : null,
      tags: ["Logan"],
      publish: true,
      comments: true,
      metaTitle: "",
      metaDescription: "",
      metaKeywords: ["Logan"],
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await fakeRequest(500);
        resetForm();
        handleClosePreview();
        setSubmitting(false);
        enqueueSnackbar("Post success", { variant: "success" });
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
  } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setFieldValue("cover", {
          ...file,
          preview: URL.createObjectURL(file),
        });
      }
    },
    [setFieldValue]
  );

  return (
    <>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Stack spacing={theme.shape.MAIN_VERTICAL_SPACING}>
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
                      Add a cover photo or video
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
                      We're here to guide you through your fundraising journey.
                    </Typography>

                    <div>
                      <UploadSingleFileOverride
                        maxSize={3145728}
                        accept="image/*"
                        file={values.cover}
                        onDrop={(e) => {
                          handleCheckout({ id, name: "file", value: e[0] });
                          handleDrop(e);
                        }}
                        error={Boolean(touched.cover && errors.cover)}
                      />
                      {touched.cover && errors.cover && (
                        <FormHelperText error sx={{ px: 2 }}>
                          {touched.cover && errors.cover}
                        </FormHelperText>
                      )}
                    </div>
                  </Stack>
                </Card>

                <Box
                  sx={{
                    height: 2,
                    backgroundColor: (theme) => theme.palette.common.white,
                    background:
                      "radial-gradient(50% 50% at 50% 50%, #DADADA 0%, rgba(218, 218, 218, 0) 100%)",

                    transform: "matrix(-1, 0, 0, 1, 0, 0)",
                    // transform: "matrix(1, 0, 0, -1, 0, 0)",
                    // transform: "rotate(-180deg)",
                  }}
                ></Box>

                <Card sx={{ px: 2, py: 2 }}>
                  <Stack
                    spacing={1}
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-start"
                  >
                    <Icon icon="fluent:link-square-20-regular" />
                    <Typography variant="p1">Add a YouTube link</Typography>
                  </Stack>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>

      {/* <BlogNewPostPreview formik={formik} openPreview={open} onClosePreview={handleClosePreview} /> */}
    </>
  );
}
