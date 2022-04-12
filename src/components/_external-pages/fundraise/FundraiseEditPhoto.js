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

// ----------------------------------------------------------------------

FundraiseEditPhoto.propTypes = {
  childRef: PropTypes.object,
  post: PropTypes.object,
};

export default function FundraiseEditPhoto({ childRef, post }) {
  const theme = useTheme();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { isLoading } = useSelector((state) => state.fundraise);
  const [open, setOpen] = useState(false);
  const isLight = theme.palette.mode === "light";

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
        // resetForm();
        await dispatch(
          updatePost({
            uid: values.uid,
            cover: values.cover,
          })
        );
        setSubmitting(false);
        enqueueSnackbar("Save success", { variant: "success" });
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
    childRef.current = formik;
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    handleOpen();
  };

  const handleDelete = () => {
    setFieldValue("cover", null);
  };

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
                    handleOpen();
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

      <FundraisePhotoEditor formik={formik} open={open} onClose={handleClose} />
    </>
  );
}
