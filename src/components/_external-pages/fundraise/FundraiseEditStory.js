import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import * as Yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";
import {
  alpha,
  experimentalStyled as styled,
  useTheme,
} from "@material-ui/core/styles";
import { Stack, FormHelperText } from "@material-ui/core";
import fakeRequest from "../../../utils/fakeRequest";
import { useDispatch, useSelector } from "../../../redux/store";
import { updatePost, getPostSuccess } from "../../../redux/slices/fundraise";
import { QuillEditor } from "../../editor";

// ----------------------------------------------------------------------

FundraiseEditStory.propTypes = {
  childRef: PropTypes.object,
  post: PropTypes.object,
};

export default function FundraiseEditStory({ childRef, post }) {
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
        // resetForm();
        await dispatch(
          updatePost({
            uid: values.uid,
            description: values.description,
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

  useEffect(() => {
    childRef.current = formik;
  }, []);

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
            error={Boolean(touched.content && errors.content)}
          />
          {touched.content && errors.content && (
            <FormHelperText error sx={{ px: 2 }}>
              {touched.content && errors.content}
            </FormHelperText>
          )}
        </Stack>
      </Form>
    </FormikProvider>
  );
}
