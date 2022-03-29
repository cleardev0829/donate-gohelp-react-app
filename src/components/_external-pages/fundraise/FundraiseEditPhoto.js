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

FundraiseEditPhoto.propTypes = {
  renderForm: PropTypes.func,
  post: PropTypes.object,
};

export default function FundraiseEditPhoto({ renderForm, post }) {
  const theme = useTheme();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const isLight = theme.palette.mode === "light";
  const [open, setOpen] = useState(false);

  const NewBlogSchema = Yup.object().shape({
    cover: Yup.mixed().required("Cover is required"),
  });

  const formik = useFormik({
    initialValues: {
      uid: post.uid,
      cover: { ...post.cover, touched: false },
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await fakeRequest(500);
        resetForm();
        handleClosePreview();
        setSubmitting(false);
        dispatch(getPostSuccess(null));
        dispatch(
          updatePost({
            uid: values.uid,
            cover: values.cover,
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

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const cover = acceptedFiles[0];

      if (cover) {
        setFieldValue("cover", {
          ...cover,
          preview: URL.createObjectURL(cover),
          rotate: 0,
          scale: 0,
          touched: true,
        });
      }
    },
    [setFieldValue]
  );

  useEffect(() => {
    renderForm(formik);
  }, [values]);

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    handleOpenPreview();
  };

  const handleDelete = () => {
    setFieldValue("cover", null);
  };

  if (_.isEmpty(post)) {
    return null;
  }

  return (
    <>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
            <Stack spacing={theme.shape.MAIN_SPACING}>
              <div>
                <UploadSingleFileOverride
                  maxSize={3145728}
                  accept="image/*"
                  file={values.cover}
                  onDrop={(acceptedFiles) => {
                    handleOpenPreview();
                    handleDrop(acceptedFiles);
                  }}
                  error={Boolean(touched.cover && errors.cover)}
                />
                {touched.cover && errors.cover && (
                  <FormHelperText error sx={{ px: 2 }}>
                    {touched.cover && errors.cover}
                  </FormHelperText>
                )}
              </div>

              <Stack direction="row" justifyContent="space-between">
                <Button
                  size="middle"
                  type="button"
                  variant="outlined"
                  startIcon={<Icon icon="akar-icons:edit" />}
                  onClick={handleEdit}
                >
                  Edit
                </Button>
                <Button
                  size="middle"
                  type="button"
                  variant="outlined"
                  startIcon={<Icon icon="bx:trash-alt" />}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Form>
      </FormikProvider>

      <FundraisePhotoEditor
        formik={formik}
        openPreview={open}
        onClosePreview={handleClosePreview}
      />
    </>
  );
}
