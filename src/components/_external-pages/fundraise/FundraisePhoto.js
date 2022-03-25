import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "../../../redux/store";
import * as Yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";
import { useSnackbar } from "notistack";
import { LoadingButton } from "@material-ui/lab";
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
  Container,
  Typography,
  FormHelperText,
} from "@material-ui/core";
import fakeRequest from "../../../utils/fakeRequest";
import { onBackStep, onNextStep } from "../../../redux/slices/fundraise";
import { UploadSingleFileOverride } from "../../upload";
import { FundraiseHeader } from ".";
import FundraisePhotoEditor from "./FundraisePhotoEditor";

// ----------------------------------------------------------------------

FundraisePhoto.propTypes = {
  id: PropTypes.string,
  activeStep: PropTypes.number,
  handleCheckout: PropTypes.func,
};

export default function FundraisePhoto({ id, activeStep, handleCheckout }) {
  const theme = useTheme();
  const dispatch = useDispatch();
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
        handleClosePreview();
        setSubmitting(false);
        // enqueueSnackbar("success", { variant: "success" });
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
        });
      }
    },
    [setFieldValue]
  );

  const handleDelete = () => {
    setFieldValue("cover", null);
    handleCheckout({
      name: "cover",
      value: null,
    });
  };

  const handleEdit = () => {
    handleOpenPreview();
  };

  return (
    <>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <FundraiseHeader
            cancelAction={handleBackStep}
            continueAction={handleSubmit}
          />

          <Container maxWidth="md">
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
                        We're here to guide you through your fundraise journey.
                      </Typography>

                      <div>
                        <UploadSingleFileOverride
                          maxSize={3145728}
                          accept="image/*"
                          file={values.cover}
                          rotate={checkout.rotate}
                          scale={checkout.scale}
                          onDrop={(acceptedFiles) => {
                            const cover = acceptedFiles[0];
                            handleCheckout({
                              name: "cover",
                              value: {
                                ...cover,
                                preview: URL.createObjectURL(cover),
                              },
                            });
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
                          size="small"
                          type="button"
                          variant="outlined"
                          startIcon={<Icon icon="akar-icons:edit" />}
                          onClick={handleEdit}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          type="button"
                          variant="outlined"
                          startIcon={<Icon icon="bx:trash-alt" />}
                          onClick={handleDelete}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </Stack>
                  </Card>

                  {/* <Box
                    sx={{
                      height: 2,
                      backgroundColor: (theme) => theme.palette.common.white,
                      background:
                        "radial-gradient(50% 50% at 50% 50%, #DADADA 0%, rgba(218, 218, 218, 0) 100%)",
                      transform: "matrix(-1, 0, 0, 1, 0, 0)",
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
                  </Card> */}
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Form>
      </FormikProvider>
      <FundraisePhotoEditor
        file={checkout.cover}
        formik={formik}
        openPreview={open}
        onClosePreview={handleClosePreview}
      />
    </>
  );
}
