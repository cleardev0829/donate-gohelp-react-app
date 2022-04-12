import { useCallback, useState } from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { Form, FormikProvider, useFormik } from "formik";
import {
  alpha,
  useTheme,
  experimentalStyled as styled,
} from "@material-ui/core/styles";
import {
  Box,
  Card,
  Grid,
  Stack,
  Button,
  Container,
  Typography,
  FormHelperText,
} from "@material-ui/core";
import fakeRequest from "../../../utils/fakeRequest";
import {
  onBackStep,
  onNextStep,
  setCheckout,
} from "../../../redux/slices/fundraise";
import { FundraiseHeader } from ".";
import FundraiseFooter from "./FundraiseFooter";
import { UploadSingleFileOverride } from "../../upload";
import FundraisePhotoEditor from "./FundraisePhotoEditor";
import { useDispatch, useSelector } from "../../../redux/store";

// ----------------------------------------------------------------------

export default function FundraisePhoto() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { checkout } = useSelector((state) => state.fundraise);
  const isLight = theme.palette.mode === "light";

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBackStep = () => {
    dispatch(onBackStep());
  };

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const NewBlogSchema = Yup.object().shape({
    cover: Yup.mixed().required("Cover is required"),
  });

  const formik = useFormik({
    initialValues: {
      cover: checkout.cover,
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await fakeRequest(500);
        resetForm();
        handleClose();
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
        });
      }
    },
    [setFieldValue]
  );

  const handleDelete = () => {
    setFieldValue("cover", null);
    dispatch(
      setCheckout({
        name: "cover",
        value: null,
      })
    );
  };

  const handleEdit = () => {
    handleOpen();
  };

  return (
    <>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Stack spacing={theme.shape.MAIN_VERTICAL_SPACING}>
                <Stack spacing={theme.shape.MAIN_SPACING}>
                  <Typography
                    variant="body2"
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

                  <div>
                    <UploadSingleFileOverride
                      maxSize={3145728}
                      accept="image/*"
                      file={checkout.cover}
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

                <Box
                  sx={{
                    height: 2,
                    backgroundColor: (theme) => theme.palette.common.white,
                    background:
                      "radial-gradient(50% 50% at 50% 50%, #DADADA 0%, rgba(218, 218, 218, 0) 100%)",
                    transform: "matrix(-1, 0, 0, 1, 0, 0)",
                  }}
                />
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
      <FundraisePhotoEditor formik={formik} open={open} onClose={handleClose} />

      <FundraiseFooter
        cancelAction={handleBackStep}
        continueAction={handleSubmit}
      />
    </>
  );
}
