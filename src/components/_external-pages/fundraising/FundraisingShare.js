import * as Yup from "yup";
import { Icon } from "@iconify/react";
import { useSnackbar } from "notistack";
import { useCallback, useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
// material
import { LoadingButton } from "@material-ui/lab";
import { alpha, experimentalStyled as styled } from "@material-ui/core/styles";
import roundVerified from "@iconify/icons-ic/round-verified";
import roundVerifiedUser from "@iconify/icons-ic/round-verified-user";
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
import { UploadSingleFile } from "../../upload";
import clockFill from "@iconify/icons-eva/clock-fill";
//
// import BlogNewPostPreview from "./BlogNewPostPreview";

// ----------------------------------------------------------------------
const IMG = (index) => `/static/socials_by_number/social_${index}.png`;

const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  justifyContent: "center",
  height: theme.spacing(8),
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.common.white,
}));

const CoverImgStyle = styled("img")({
  width: 40,
  height: 40,
});

// ----------------------------------------------------------------------

export default function FundraisingShare() {
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
    <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} sx={{ textAlign: "center" }}>
              <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
                <Typography
                  variant="h3"
                  sx={{
                    ...(!isLight && {
                      textShadow: (theme) =>
                        `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`,
                    }),
                  }}
                >
                  Share your fundraiser
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    ...(!isLight && {
                      textShadow: (theme) =>
                        `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`,
                    }),
                  }}
                >
                  Ask 3-5 friends to help you share. Fundraisers shared on
                  social network raises up to 5x more!
                </Typography>
              </Stack>
            </Grid>

            <Grid container sx={{ mt: 4 }}>
              {[...Array(8)].map((item, index) => (
                <Grid item xs={12} md={3} key={index}>
                  <Box
                    sx={{
                      mx: "auto",
                      maxWidth: 280,
                      textAlign: "center",
                    }}
                  >
                    <IconWrapperStyle>
                      <CoverImgStyle alt="post cover" src={IMG(index + 1)} />
                    </IconWrapperStyle>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Grid item xs={12} md={12}>
              <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
                <Card
                  sx={{
                    p: (theme) => theme.spacing(1.25, 3),
                  }}
                >
                  <Stack spacing={1} direction="row" alignItems="center">
                    <img src="/static/home/gmail.png" alt="gmail" />

                    <TextField
                      fullWidth
                      size="small"
                      label="Enter mail address"
                      {...getFieldProps("title")}
                      error={Boolean(touched.title && errors.title)}
                      // helperText={touched.title && errors.title}
                    />

                    <Button size="medium" variant="contained">
                      Share
                    </Button>
                  </Stack>
                </Card>

                <Card
                  sx={{
                    p: (theme) => theme.spacing(1.25, 3),
                  }}
                >
                  <Stack spacing={1} direction="row" alignItems="center">
                    <TextField
                      fullWidth
                      size="small"
                      label="Fundraiser link"
                      {...getFieldProps("title")}
                      error={Boolean(touched.title && errors.title)}
                      // helperText={touched.title && errors.title}
                    />

                    <Button variant="contained">Copy</Button>
                  </Stack>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </Box>
  );
}
