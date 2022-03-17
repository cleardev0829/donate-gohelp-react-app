import PropTypes from "prop-types";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { useCallback, useState, useEffect } from "react";
import { Form, FormikProvider, useFormik } from "formik";
// material
import { LoadingButton } from "@material-ui/lab";
import { alpha, experimentalStyled as styled } from "@material-ui/core/styles";

import {
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
import { useDispatch, useSelector } from "../../../redux/store";
import {
  deleteCart,
  onNextStep,
  applyDiscount,
  increaseQuantity,
  decreaseQuantity,
  applyBasic,
} from "../../../redux/slices/fundraise";
//
// import BlogNewPostPreview from "./BlogNewPostPreview";

// ----------------------------------------------------------------------

const COUNTRIES = [
  { id: "Canada", value: "Canada" },
  { id: "France", value: "France" },
  { id: "Japan", value: "Japan" },
];

const TYPES = [
  "Medical",
  "Memorial",
  "Emergency",
  "Nonprofit",
  "Education",
  "Animals",
  "Environment",
  "Business",
  "Community",
  "Competition",
  "Creative",
  "Event",
  "Faith",
  "Family",
  "Sports",
  "Travel",
  "Volunteer",
  "Wishes",
];

// ----------------------------------------------------------------------

FundraisingBasics.propTypes = {
  id: PropTypes.string,
  activeStep: PropTypes.number,
  handleCheckout: PropTypes.func,
};

export default function FundraisingBasics({ id, activeStep, handleCheckout }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { checkout } = useSelector((state) => state.fundraise);
  const isLight = theme.palette.mode === "light";
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  const handleClosePreview = () => {
    setOpen(false);
  };

  const NewBlogSchema = Yup.object().shape({
    live: Yup.string().required("this is required"),
    category: Yup.string().required("this is required"),
    // content: Yup.string().min(1000).required("Content is required"),
    // cover: Yup.mixed().required("Cover is required"),
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

  return (
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
                    `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`,
                }),
              }}
            >
              Let’s start with the basic
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
              We're here to guide you through your fundraising journey.
            </Typography>

            <Typography
              variant="h5"
              sx={{
                ...(!isLight && {
                  textShadow: (theme) =>
                    `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`,
                }),
              }}
            >
              Where do you live?
            </Typography>

            <TextField
              fullWidth
              size="small"
              label=""
              {...getFieldProps("live")}
              error={Boolean(touched.live && errors.live)}
              helperText={touched.live && errors.live}
              select
              onChange={(e) => {
                handleCheckout({
                  id,
                  name: e.target.name,
                  value: e.target.value,
                });
                handleChange(e);
              }}
            >
              {COUNTRIES.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>

            <Typography
              variant="h5"
              sx={{
                ...(!isLight && {
                  textShadow: (theme) =>
                    `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`,
                }),
              }}
            >
              What are you fundraising for?
            </Typography>

            <TextField
              fullWidth
              size="small"
              label=""
              {...getFieldProps("category")}
              error={Boolean(touched.category && errors.category)}
              helperText={touched.category && errors.category}
              select
              onChange={(e) => {
                handleCheckout({
                  id,
                  name: e.target.name,
                  value: e.target.value,
                });
                handleChange(e);
              }}
            >
              {TYPES.map((option) => (
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
          variant="p1"
          sx={{
            ...(!isLight && {
              textShadow: (theme) =>
                `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`,
            }),
          }}
        >
          By continuing, you agree to the GoFundMe terms and privacy policy.
        </Typography>
      </Grid>
    </Grid>
  );
}
