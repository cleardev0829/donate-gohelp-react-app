import * as Yup from "yup";
import PropTypes from "prop-types";
import faker from "faker";
import { useSnackbar } from "notistack";
import moment from "moment";
import { useCallback, useState } from "react";
import { Icon } from "@iconify/react";
import { Form, FormikProvider, useFormik } from "formik";
import checkmarkCircle2Outline from "@iconify/icons-eva/checkmark-circle-2-outline";
// material
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
  Container,
  Typography,
} from "@material-ui/core";
// utils
import fakeRequest from "../../../utils/fakeRequest";
import { useDispatch, useSelector } from "../../../redux/store";
import {
  onBackStep,
  onNextStep,
  addPost,
  setCheckout,
} from "../../../redux/slices/fundraise";
import { FundraiseHeader } from ".";

// ----------------------------------------------------------------------

const DESCRIPTIONS = [
  "Share with 3-5 friends and ask them to help you share",
  "Post to at least 1 social network",
  "Send reminder to your friends",
];

IconBullet.propTypes = {
  type: PropTypes.oneOf(["subheader", "item"]),
};

function IconBullet({ type = "item" }) {
  return (
    <Box sx={{ width: 24, height: 16, display: "flex", alignItems: "center" }}>
      <Box
        component="span"
        sx={{
          ml: "2px",
          width: 4,
          height: 4,
          borderRadius: "50%",
          bgcolor: "currentColor",
          ...(type !== "item" && {
            ml: 0,
            width: 8,
            height: 2,
            borderRadius: 2,
          }),
        }}
      />
    </Box>
  );
}
// ----------------------------------------------------------------------

export default function FundraiseDonation() {
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
    // dispatch(onBackStep());
  };

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const NewBlogSchema = Yup.object().shape({
    // title: Yup.string().required("Title is required"),
    // description: Yup.string().required("Description is required"),
    // content: Yup.string().min(1000).required("Content is required"),
    // cover: Yup.mixed().required("Cover is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await fakeRequest(500);
        resetForm();
        handleClosePreview();
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
                      Your fundraiser is ready.
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
                      Let’s start getting donations.
                    </Typography>

                    <Stack spacing={2} sx={{ p: 0 }}>
                      <Stack direction="row" alignItems="center">
                        <Icon
                          width={25}
                          icon={checkmarkCircle2Outline}
                          color={theme.palette.primary.main}
                        />
                        <Typography variant="p2" sx={{ ml: 1 }}>
                          Set up your GoHelp
                        </Typography>
                      </Stack>
                    </Stack>

                    {DESCRIPTIONS.map((description, index) => (
                      <Stack
                        key={`Stack-${index}`}
                        direction="row"
                        alignItems="center"
                      >
                        <IconBullet key={`IconBullet-${index}`} type="item" />
                        <Typography key={`Typography-${index}`} variant="p2">
                          {description}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Form>
      </FormikProvider>

      {/* <BlogNewPostPreview formik={formik} openPreview={open} onClosePreview={handleClosePreview} /> */}
    </>
  );
}
