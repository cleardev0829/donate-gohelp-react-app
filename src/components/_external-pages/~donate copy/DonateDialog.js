import * as Yup from "yup";
import moment from "moment";
import { isString } from "lodash";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { LoadingButton } from "@material-ui/lab";
import { Form, FormikProvider, useFormik } from "formik";
import {
  alpha,
  useTheme,
  experimentalStyled as styled,
} from "@material-ui/core/styles";
import {
  Box,
  Stack,
  Button,
  Divider,
  TextField,
  Container,
  Typography,
  CardContent,
  DialogActions,
} from "@material-ui/core";
import { DonateDonation } from ".";
import Markdown from "../../Markdown";
import Scrollbar from "../../Scrollbar";
import { DialogAnimate } from "../../animate";
import EmptyContent from "../../EmptyContent";
import fakeRequest from "../../../utils/fakeRequest";
import { useDispatch, useSelector } from "../../../redux/store";
import { addDonate, resetPost } from "src/redux/slices/fundraise";

// ----------------------------------------------------------------------

DonateDialog.propTypes = {
  post: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default function DonateDialog({ post, open, onClose }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const Schema = Yup.object().shape({
    cryptoType: Yup.string().required("This is required"),
    cryptoCount: Yup.number().min(0.0000001).required("This is required"),
    tip: Yup.number(),
  });

  const formik = useFormik({
    initialValues: {
      cryptoType: "",
      cryptoCount: 0,
      tip: 0,
      message: "",
    },
    validationSchema: Schema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await fakeRequest(500);
        resetForm();
        onClose();
        setSubmitting(false);

        dispatch(resetPost());
        dispatch(
          addDonate({
            fundraiseId: post.uid,
            crypto: { type: values.cryptoType, count: values.cryptoCount },
            tip: values.tip,
            message: values.message,
            createdAt: moment(),
          })
        );
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
    isValid,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    getFieldProps,
    handleChange,
  } = formik;

  return (
    <DialogAnimate open={open} onClose={onClose}>
      <CardContent sx={{ px: 3 }}>
        <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
          Donate
        </Typography>
      </CardContent>

      <Divider />

      <Box sx={{ pt: theme.shape.CARD_PADDING }}>
        <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
          <DonateDonation post={post} formik={formik} />

          <Divider />

          <Stack spacing={theme.shape.MAIN_SPACING} sx={{ px: 3 }}>
            <Typography variant="body2">Leave a message</Typography>
            <TextField
              fullWidth
              multiline
              minRows={3}
              maxRows={20}
              size="small"
              label="Enter your message"
              {...getFieldProps("message")}
              error={Boolean(touched.message && errors.message)}
              helperText={touched.message && errors.message}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </Stack>
        </Stack>
      </Box>

      <DialogActions>
        <Stack
          spacing={theme.shape.CARD_CONTENT_SPACING}
          direction="row"
          justifyContent={"space-between"}
        >
          <Button onClick={onClose}>Cancel</Button>
          <LoadingButton
            type="submit"
            variant="contained"
            disabled={!isValid}
            loading={isSubmitting}
            onClick={handleSubmit}
          >
            Give
          </LoadingButton>
        </Stack>
      </DialogActions>
    </DialogAnimate>
  );
}
