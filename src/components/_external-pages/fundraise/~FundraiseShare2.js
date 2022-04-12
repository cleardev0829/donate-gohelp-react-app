import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import moment from "moment";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { useSnackbar } from "notistack";
import { Form, FormikProvider, useFormik } from "formik";
import { LoadingButton } from "@material-ui/lab";
import { alpha, experimentalStyled as styled } from "@material-ui/core/styles";
import {
  Box,
  Card,
  Grid,
  Stack,
  Button,
  TextField,
  Container,
  Typography,
  useTheme,
} from "@material-ui/core";
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  InstapaperShareButton,
  EmailShareButton,
  TelegramShareButton,
  LinkedinShareButton,
  MailruShareButton,
  FacebookIcon,
  TelegramIcon,
  EmailIcon,
  InstapaperIcon,
  MailruIcon,
} from "react-share";
import { PATH_PAGE } from "src/routes/paths";
import CopyClipboard from "../../CopyClipboard";
import { makePageLink } from "src/utils/constants";
import fakeRequest from "../../../utils/fakeRequest";
import { useDispatch, useSelector } from "../../../redux/store";
import { onBackStep, onNextStep } from "../../../redux/slices/fundraise";

// ----------------------------------------------------------------------

const FACEBOOK_IMG_URL = `/static/socials/facebook.png`;
const TWITTER_IMG_URL = `/static/socials/twitter.png`;
const WHATSAPP_IMG_URL = `/static/socials/whatsapp.png`;
const INSTAGRAM_IMG_URL = `/static/socials/instagram.png`;
const LINKEDIN_IMG_URL = `/static/socials/linkedin.png`;
const TIKTOK_IMG_URL = `/static/socials/tiktok.png`;
const FACEBOOK_MESSENGER_IMG_URL = `/static/socials/facebook_messenger.png`;

const ShareButtonWrapper = ({ children }) => (
  <Grid item xs={12} md={3}>
    <Box
      sx={{
        mx: "auto",
        textAlign: "center",
      }}
    >
      {children}
    </Box>
  </Grid>
);
const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  justifyContent: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.common.white,
}));

const CoverImgStyle = styled("img")({
  width: 40,
  height: 40,
});

// ----------------------------------------------------------------------

FundraiseShare.propTypes = {
  uid: PropTypes.string,
  title: PropTypes.string,
  isStepBar: PropTypes.bool,
};

export default function FundraiseShare({ uid, title, isStepBar = false }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkout } = useSelector((state) => state.fundraise);
  const { enqueueSnackbar } = useSnackbar();
  const isLight = theme.palette.mode === "light";
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    value: "",
    copied: false,
  });

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
    email: Yup.string().email("Email must be a valid email address"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      pageLink: makePageLink(uid),
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await fakeRequest(500);
        resetForm();
        handleClosePreview();
        setSubmitting(false);
        // enqueueSnackbar("Save success", { variant: "success" });
        navigate(`${PATH_PAGE.fundraiseDetails}/${uid}`);
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

  const onCopy = () => {
    setState({ ...state, copied: true });
    if (state.value) {
      enqueueSnackbar("Copied", { variant: "success" });
    }
  };

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        {isStepBar && (
          <FundraiseHeader
            cancelButton={false}
            cancelAction={handleBackStep}
            continueAction={handleSubmit}
          />
        )}

        <Box
          sx={{
            maxWidth: 480,
            margin: "auto",
            textAlign: "center",
          }}
        >
          <Grid container>
            <Grid item xs={12} md={12} sx={{ textAlign: "center" }}>
              <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
                <Typography
                  variant="h5"
                  sx={{
                    ...(!isLight && {
                      textShadow: (theme) =>
                        `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`,
                    }),
                  }}
                >
                  Share your fundraiser
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    ...(!isLight && {
                      textShadow: (theme) =>
                        `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`,
                    }),
                  }}
                >
                  Ask 3-5 friends to help you share. Fundraisers shared on
                  social network raises up to 5x more!
                </Typography>
              </Stack>
            </Grid>

            <Grid container sx={{ mt: 4 }}>
              <ShareButtonWrapper>
                <FacebookShareButton url={values.pageLink}>
                  <IconWrapperStyle>
                    <CoverImgStyle alt="post cover" src={FACEBOOK_IMG_URL} />
                  </IconWrapperStyle>
                </FacebookShareButton>
              </ShareButtonWrapper>

              <ShareButtonWrapper>
                <FacebookMessengerShareButton url={values.pageLink}>
                  <IconWrapperStyle>
                    <CoverImgStyle
                      alt="post cover"
                      src={FACEBOOK_MESSENGER_IMG_URL}
                    />
                  </IconWrapperStyle>
                </FacebookMessengerShareButton>
              </ShareButtonWrapper>

              <ShareButtonWrapper>
                <TwitterShareButton url={values.pageLink} title={title}>
                  <IconWrapperStyle>
                    <CoverImgStyle alt="post cover" src={TWITTER_IMG_URL} />
                  </IconWrapperStyle>
                </TwitterShareButton>
              </ShareButtonWrapper>

              <ShareButtonWrapper>
                <WhatsappShareButton url={values.pageLink} title={title}>
                  <IconWrapperStyle>
                    <CoverImgStyle alt="post cover" src={WHATSAPP_IMG_URL} />
                  </IconWrapperStyle>
                </WhatsappShareButton>
              </ShareButtonWrapper>

              <ShareButtonWrapper>
                <InstapaperShareButton url={values.pageLink} title={title}>
                  <IconWrapperStyle>
                    <InstapaperIcon size={32} round />
                  </IconWrapperStyle>
                </InstapaperShareButton>
              </ShareButtonWrapper>

              <ShareButtonWrapper>
                <TelegramShareButton url={values.pageLink} title={title}>
                  <IconWrapperStyle>
                    <TelegramIcon size={32} round />
                  </IconWrapperStyle>
                </TelegramShareButton>
              </ShareButtonWrapper>

              <ShareButtonWrapper>
                <LinkedinShareButton url={values.pageLink} title={title}>
                  <IconWrapperStyle>
                    <CoverImgStyle alt="post cover" src={LINKEDIN_IMG_URL} />
                  </IconWrapperStyle>
                </LinkedinShareButton>
              </ShareButtonWrapper>

              <ShareButtonWrapper>
                <MailruShareButton url={values.pageLink} title={title}>
                  <IconWrapperStyle>
                    <MailruIcon size={32} round />
                  </IconWrapperStyle>
                </MailruShareButton>
              </ShareButtonWrapper>
            </Grid>

            <Grid item xs={12} md={12}>
              <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
                <Card
                  sx={{
                    p: (theme) => theme.spacing(1.25, 3),
                  }}
                >
                  <Stack spacing={1} direction="row" alignItems="center">
                    <img src="/static/home/gmail.png" alt="gmail" />

                    <TextField
                      fullWidth
                      size="small"
                      label="Enter mail address"
                      {...getFieldProps("email")}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />

                    <ShareButtonWrapper>
                      <EmailShareButton
                        url={values.email}
                        subject={title}
                        body="body"
                      >
                        <Button size="medium" variant="contained">
                          Share
                        </Button>
                      </EmailShareButton>
                    </ShareButtonWrapper>
                  </Stack>
                </Card>

                <Card
                  sx={{
                    p: (theme) => theme.spacing(1.25, 3),
                  }}
                >
                  <Stack spacing={1} direction="row" alignItems="center">
                    <CopyClipboard
                      fullWidth
                      size="small"
                      label="Fundraiser link"
                      {...getFieldProps("pageLink")}
                      error={Boolean(touched.pageLink && errors.pageLink)}
                      helperText={touched.pageLink && errors.pageLink}
                    />
                    {/* <Button variant="contained" onClick={onCopy}>
                      Copy
                    </Button> */}
                  </Stack>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Form>
    </FormikProvider>
  );
}
