import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "../../../redux/store";
import checkmarkCircle2Outline from "@iconify/icons-eva/checkmark-circle-2-outline";
import radioButtonOffOutline from "@iconify/icons-eva/radio-button-off-outline";
import * as Yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";
import {
  alpha,
  experimentalStyled as styled,
  useTheme,
} from "@material-ui/core/styles";
import {
  Box,
  Card,
  Grid,
  Stack,
  Button,
  MenuItem,
  Checkbox,
  TextField,
  Container,
  Typography,
  InputAdornment,
  FormHelperText,
} from "@material-ui/core";
import fakeRequest from "../../../utils/fakeRequest";
import {
  onBackStep,
  onNextStep,
  setCheckout,
  addUpdate,
  getPost,
  updatePost,
  getPostSuccess,
} from "../../../redux/slices/fundraise";
import { UploadSingleFileOverride } from "../../upload";
import { FundraiseHeader } from ".";
import FundraisePhotoEditor from "./FundraisePhotoEditor";
import Page from "src/components/Page";
import { QuillEditor } from "../../editor";
import { CATEGORIES } from "src/utils/constants";
import countries from "./countries";
import ReactCountryFlag from "react-country-flag";

// ----------------------------------------------------------------------

const initialValues = {
  title: "",
  description: null,
  goal: 0,
  live: null,
  category: "",
  link: "",
  team: { name: "", cover: null },
  allowComment: 0,
  allowDonation: 0,
  allowSearch: 0,
  cover: null,
};

FundraiseEditStory.propTypes = {
  renderForm: PropTypes.func,
  post: PropTypes.object,
};

export default function FundraiseEditStory({ renderForm, post }) {
  const theme = useTheme();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const isLight = theme.palette.mode === "light";

  const NewBlogSchema = Yup.object().shape({
    description: Yup.mixed().required("This is required"),
  });

  const formik = useFormik({
    initialValues: {
      uid: post.uid,
      description: post.description,
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await fakeRequest(500);
        resetForm();
        setSubmitting(false);
        console.log("----------------", values);
        dispatch(getPostSuccess(null));
        dispatch(
          updatePost({
            uid: values.uid,
            description: values.description,
          })
        );
        enqueueSnackbar("Save success", { variant: "success" });
        // navigate(-1);
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

  useEffect(() => {
    renderForm(formik);
  }, [values]);

  if (_.isEmpty(post)) {
    return null;
  }

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
          <QuillEditor
            id="product-description"
            simple
            value={values.description.content}
            onChange={(content, delta, source, editor) => {
              const text = editor.getText(content);

              setFieldValue("description", { content, text });
            }}
            error={Boolean(touched.description && errors.description)}
          />
          {touched.description && errors.description && (
            <FormHelperText error sx={{ px: 2 }}>
              {touched.description && errors.description}
            </FormHelperText>
          )}
        </Stack>
      </Form>
    </FormikProvider>
  );
}
