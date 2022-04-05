import PropTypes from "prop-types";
import { useCallback, useState } from "react";
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
  useTheme,
  experimentalStyled as styled,
} from "@material-ui/core/styles";
import {
  Card,
  Grid,
  Stack,
  Button,
  Checkbox,
  Container,
  Typography,
  FormHelperText,
} from "@material-ui/core";
import { addUpdate } from "../../../redux/slices/fundraise";
import { QuillEditor } from "../../editor";
import FundraiseHeader from "./FundraiseHeader";
import fakeRequest from "../../../utils/fakeRequest";
import { UploadSingleFileOverride } from "../../upload";
import FundraisePhotoEditor from "./FundraisePhotoEditor";

// ----------------------------------------------------------------------

export default function FundraiseUpdate() {
  const theme = useTheme();
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const isLight = theme.palette.mode === "light";

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    handleOpenPreview();
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const NewBlogSchema = Yup.object().shape({
    content: Yup.string().required("Description is required"),
    cover: Yup.mixed().required("Cover is required"),
  });

  const formik = useFormik({
    initialValues: {
      content: "",
      text: "",
      cover: null,
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await fakeRequest(500);
        resetForm();
        handleClosePreview();
        setSubmitting(false);
        dispatch(
          addUpdate({
            fundraiseId: params.id,
            description: {
              content: values.content,
              text: values.text,
            },
            cover: values.cover,
          })
        );
        enqueueSnackbar("Post success", { variant: "success" });
        navigate(-1);
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
  };

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          paddingTop: (theme) => theme.spacing(theme.shape.PAGE_TOP_PADDING),
          paddingBottom: (theme) =>
            theme.spacing(theme.shape.PAGE_BOTTOM_PADDING),
        }}
      >
        <FormikProvider value={formik}>
          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <FundraiseHeader
              cancelTitle="Cancel"
              continueTitle="Post Update"
              cancelAction={handleCancel}
              continueAction={handleSubmit}
            />

            <Container maxWidth="md">
              <Grid container>
                <Grid item xs={12} md={12}>
                  <Stack spacing={theme.shape.MAIN_VERTICAL_SPACING}>
                    <Card
                      sx={{
                        p: theme.shape.CARD_PADDING,
                      }}
                    >
                      <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
                        <Typography
                          component="p"
                          variant="h5"
                          sx={{ color: "text.primary" }}
                        >
                          Post an Update
                        </Typography>

                        <Typography
                          component="p"
                          variant="body1"
                          sx={{ color: "text.primary" }}
                        >
                          So that people can get in touch with you.
                        </Typography>

                        <Typography
                          variant="subtitle1"
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
                          Share your news
                        </Typography>

                        <QuillEditor
                          id="product-description"
                          simple
                          value={values.content}
                          onChange={(content, delta, source, editor) => {
                            const text = editor.getText(content);

                            setFieldValue("content", content);
                            setFieldValue("text", text);
                          }}
                          error={Boolean(touched.content && errors.content)}
                        />
                        {touched.content && errors.content && (
                          <FormHelperText error sx={{ px: 2 }}>
                            {touched.content && errors.content}
                          </FormHelperText>
                        )}

                        <Typography
                          variant="subtitle1"
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
                  </Stack>
                </Grid>
              </Grid>
            </Container>
          </Form>
        </FormikProvider>
      </Container>

      <FundraisePhotoEditor
        formik={formik}
        openPreview={open}
        onClosePreview={handleClosePreview}
      />
    </>
  );
}
