import * as Yup from "yup";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { useCallback, useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import pinFill from "@iconify/icons-eva/pin-fill";
import checkmarkCircle2Outline from "@iconify/icons-eva/checkmark-circle-2-outline";
import radioButtonOffOutline from "@iconify/icons-eva/radio-button-off-outline";
// material
import { LoadingButton } from "@material-ui/lab";
import { alpha, experimentalStyled as styled } from "@material-ui/core/styles";

import {
  Box,
  Card,
  Grid,
  Icon,
  Stack,
  Button,
  Switch,
  Select,
  Checkbox,
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
import { UploadSingleFile } from "../../upload";
import { MRadio } from "src/components/@material-extend";
//
// import BlogNewPostPreview from "./BlogNewPostPreview";

// ----------------------------------------------------------------------

const DESCRIPTIONS = [
  "Share with 3-5 friends and ask them to help you share",
  "Post to at least 1 social network",
  "Send reminder to your friends",
];

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

IconBullet.propTypes = {
  type: PropTypes.oneOf(["subheader", "item"]),
};

function IconBullet({ type = "item" }) {
  return (
    <Box sx={{ width: 24, height: 16, display: "flex", alignItems: "center" }}>
      <Box
        component="span"
        sx={{
          ml: "2px",
          width: 4,
          height: 4,
          borderRadius: "50%",
          bgcolor: "currentColor",
          ...(type !== "item" && {
            ml: 0,
            width: 8,
            height: 2,
            borderRadius: 2,
          }),
        }}
      />
    </Box>
  );
}
// ----------------------------------------------------------------------

export default function FundraisingDonation() {
  const theme = useTheme();
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
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    content: Yup.string().min(1000).required("Content is required"),
    cover: Yup.mixed().required("Cover is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      content: "",
      cover: null,
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
              <Card
                sx={{
                  p: 3,
                }}
              >
                <Stack spacing={3}>
                  <Typography
                    variant="h3"
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
                    Your fundraiser is ready.
                  </Typography>

                  <Typography
                    variant="h6"
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
                    Let’s start getting donations.
                  </Typography>

                  <Stack spacing={2} sx={{ p: 3 }}>
                    <Stack direction="row" alignItems="center">
                      <Icon icon={checkmarkCircle2Outline} />
                      <Typography variant="p3">Set up your GoHelp</Typography>
                    </Stack>
                  </Stack>

                  {DESCRIPTIONS.map((description) => (
                    <>
                      <Stack direction="row" alignItems="center">
                        <IconBullet type="item" />
                        <Typography variant="p3">{description}</Typography>
                      </Stack>
                    </>
                  ))}
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>

      {/* <BlogNewPostPreview formik={formik} openPreview={open} onClosePreview={handleClosePreview} /> */}
    </>
  );
}
