import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { useCallback, useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import { PATH_DASHBOARD, PATH_PAGE } from "../../../routes/paths";

// material
import { LoadingButton } from "@material-ui/lab";
import { experimentalStyled as styled } from "@material-ui/core/styles";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Link,
  Stack,
  Button,
  Switch,
  Container,
  TextField,
  Typography,
  Autocomplete,
  FormHelperText,
  FormControlLabel,
} from "@material-ui/core";
// utils
import fakeRequest from "../../../utils/fakeRequest";
//
import { QuillEditor } from "../../editor";
import { UploadSingleFile } from "../../upload";
import {
  varFadeIn,
  varFadeInUp,
  varWrapEnter,
  varFadeInRight,
} from "../../animate";
import { ProgressItem } from "../landing/TopFundraiserCard";

// ----------------------------------------------------------------------

const IMG = (index) => `/static/fundraisers/fundraiser_${index}.png`;

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

const TitleStyle = styled(Link)({
  // height: 64,
  // overflow: "hidden",
  // WebkitLineClamp: 2,
  // display: "-webkit-box",
  // WebkitBoxOrient: "vertical",
});

const CardMediaStyle = styled("div")({
  // height: 100,
  position: "relative",
  paddingTop: "calc(100% * 3 / 4)",
});

const CoverImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "contain",
  // objectFit: "cover",
  position: "absolute",
});

const FacebookImgStyle = styled("img")({
  width: 40,
  height: 40,
});
// ----------------------------------------------------------------------

export default function FundraisingDetails() {
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
          <Container sx={{ pb: 15 }}>
            <Stack spacing={5}>
              <Grid container spacing={5}>
                <Grid item xs={12} md={5}>
                  <Card sx={{ position: "relative" }}>
                    <CardMediaStyle>
                      <CoverImgStyle alt={"title"} src={IMG(1)} />
                    </CardMediaStyle>
                  </Card>
                </Grid>

                <Grid item xs={12} md={5}>
                  <Stack
                    spacing={2}
                    justifyContent="space-between"
                    sx={{ height: "100%", py: 2 }}
                  >
                    <TitleStyle
                      color="inherit"
                      variant="h5"
                      sx={{
                        typography: "h3",
                        height: 60,
                      }}
                    >
                      Share Support Laura swans wish to live longer
                    </TitleStyle>

                    <Stack direction="row" justifyContent="space-between">
                      <motion.div variants={varFadeInRight}>
                        <Button
                          size="large"
                          variant="contained"
                          component={RouterLink}
                          to={PATH_PAGE.page404}
                        >
                          Edit and settings
                        </Button>
                      </motion.div>
                      <motion.div variants={varFadeInRight}>
                        <Button
                          size="large"
                          variant="contained"
                          component={RouterLink}
                          to={PATH_PAGE.page404}
                        >
                          View fundraiser
                        </Button>
                      </motion.div>
                    </Stack>

                    <ProgressItem
                      key={" Last donation 3 min ago"}
                      progress={{ value: 78 }}
                      index={0}
                    />

                    <Typography
                      gutterBottom
                      variant="h6"
                      sx={{ display: "block", mt: 2 }}
                    >
                      7,800 token raised of 10,000 Token
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button
                    fullWidth
                    type="button"
                    color="inherit"
                    variant="outlined"
                    size="large"
                    onClick={handleOpenPreview}
                    sx={{ mr: 1.5 }}
                  >
                    Update
                  </Button>
                </Grid>
              </Grid>

              <Grid container>
                <Card
                  sx={{
                    width: "100%",
                    backgroundColor: (theme) => theme.palette.common.white,
                  }}
                >
                  <CardContent>
                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={1}
                    >
                      <Stack spacing={2} direction="row" alignItems="center">
                        <FacebookImgStyle
                          alt="post cover"
                          src="/static/socials/Facebook.png"
                        />
                        <Typography
                          gutterBottom
                          variant="h7"
                          color={(theme) => theme.palette.common.black}
                          sx={{ display: "block", mt: 2 }}
                        >
                          Dud you know? Sharing on Facebook can increase your
                          donation as much as 350%
                        </Typography>
                      </Stack>

                      <Button
                        type="button"
                        // color="inherit"
                        variant="contained"
                        size="large"
                        // onClick={handleOpenPreview}
                        sx={{ mr: 1.5 }}
                      >
                        Share on Facebook
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Card
                sx={{
                  p: 3,
                }}
              >
                <Grid container spacing={5}>
                  <Grid item xs={12} md={3}>
                    <CardMediaStyle>
                      <CoverImgStyle
                        alt={"title"}
                        src={"/static/home/social-marketing.png"}
                      />
                    </CardMediaStyle>
                  </Grid>

                  <Grid item xs={12} md={9}>
                    <Stack
                      spacing={2}
                      justifyContent="space-between"
                      sx={{ height: "100%", py: 2 }}
                    >
                      <TitleStyle
                        color="inherit"
                        variant="h5"
                        sx={{
                          typography: "h3",
                          // height: 60,
                        }}
                      >
                        Get your first donation by sharing
                      </TitleStyle>

                      <Typography
                        gutterBottom
                        variant="p2"
                        sx={{ display: "block", mt: 2 }}
                      >
                        Share your fundraiser regularly with your social
                        networks for the most success. Check in and personally
                        ask friends to donate or share.
                      </Typography>

                      <motion.div variants={varFadeInRight}>
                        <Button
                          size="large"
                          variant="contained"
                          component={RouterLink}
                          to={PATH_PAGE.page404}
                        >
                          Share fundraiser
                        </Button>
                      </motion.div>
                    </Stack>
                  </Grid>
                </Grid>
              </Card>
            </Stack>
          </Container>
        </Form>
      </FormikProvider>

      {/* <BlogNewPostPreview formik={formik} openPreview={open} onClosePreview={handleClosePreview} /> */}
    </>
  );
}
