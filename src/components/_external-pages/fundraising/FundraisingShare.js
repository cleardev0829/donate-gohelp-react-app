import PropTypes from "prop-types";
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
import CopyClipboard from "../../../components/CopyClipboard";
// import BlogNewPostPreview from "./BlogNewPostPreview";
import { useDispatch, useSelector } from "../../../redux/store";

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

FundraisingShare.propTypes = {
  id: PropTypes.string,
  activeStep: PropTypes.number,
  handleCheckout: PropTypes.func,
};

export default function FundraisingShare({ id, activeStep, handleCheckout }) {
  const theme = useTheme();
  const { checkout } = useSelector((state) => state.fundraise);

  const { enqueueSnackbar } = useSnackbar();
  const isLight = theme.palette.mode === "light";
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    value: "",
    copied: false,
  });

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const NewBlogSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    link: Yup.string().required("Link is required"),
    content: Yup.string().min(1000).required("Content is required"),
    cover: Yup.mixed().required("Cover is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: checkout.email,
      link: checkout.link,
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
    handleChange,
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

  const onCopy = () => {
    setState({ ...state, copied: true });
    if (state.value) {
      enqueueSnackbar("Copied", { variant: "success" });
    }
  };

  const handleShare = () => {};

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
                      {...getFieldProps("email")}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                      onChange={(e) => {
                        handleCheckout({
                          id,
                          name: e.target.name,
                          value: e.target.value,
                        });
                        handleChange(e);
                      }}
                    />

                    <Button
                      size="medium"
                      variant="contained"
                      onClick={handleShare}
                    >
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
                    <CopyClipboard
                      fullWidth
                      size="small"
                      label="Fundraiser link"
                      {...getFieldProps("link")}
                      error={Boolean(touched.link && errors.link)}
                      helperText={touched.link && errors.link}
                      value="https://www.npmjs.com/package/react-copy-to-clipboard"
                    />
                    {/* <Button variant="contained" onClick={onCopy}>
                      Copy
                    </Button> */}
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
