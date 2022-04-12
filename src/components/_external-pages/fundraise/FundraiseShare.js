import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Icon } from "@iconify/react";
import { useSnackbar } from "notistack";
import { useState } from "react";
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
  TextField,
  Typography,
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
import { PATH_PAGE } from "../../../routes/paths";
import CopyClipboard from "../../CopyClipboard";
import fakeRequest from "../../../utils/fakeRequest";
import { makePageLink } from "../../../utils/constants";
import { useDispatch, useSelector } from "../../../redux/store";

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
  post: PropTypes.object,
};

export default function FundraiseShare({ post }) {
  const theme = useTheme();
  const [state, setState] = useState({
    value: "",
    copied: false,
  });
  const { enqueueSnackbar } = useSnackbar();
  const isLight = theme.palette.mode === "light";

  const Schema = Yup.object().shape({
    email: Yup.string().email("Email must be a valid email address"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      pageLink: makePageLink(post.id),
    },
    validationSchema: Schema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await fakeRequest(500);
        resetForm();
        // handleClose();
        setSubmitting(false);
        // enqueueSnackbar("Save success", { variant: "success" });
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
                <FacebookShareButton url={post.link}>
                  <IconWrapperStyle>
                    <CoverImgStyle alt="post cover" src={FACEBOOK_IMG_URL} />
                  </IconWrapperStyle>
                </FacebookShareButton>
              </ShareButtonWrapper>

              <ShareButtonWrapper>
                <FacebookMessengerShareButton url={post.link}>
                  <IconWrapperStyle>
                    <CoverImgStyle
                      alt="post cover"
                      src={FACEBOOK_MESSENGER_IMG_URL}
                    />
                  </IconWrapperStyle>
                </FacebookMessengerShareButton>
              </ShareButtonWrapper>

              <ShareButtonWrapper>
                <TwitterShareButton url={post.link} title={post.title}>
                  <IconWrapperStyle>
                    <CoverImgStyle alt="post cover" src={TWITTER_IMG_URL} />
                  </IconWrapperStyle>
                </TwitterShareButton>
              </ShareButtonWrapper>

              <ShareButtonWrapper>
                <WhatsappShareButton url={post.link} title={post.title}>
                  <IconWrapperStyle>
                    <CoverImgStyle alt="post cover" src={WHATSAPP_IMG_URL} />
                  </IconWrapperStyle>
                </WhatsappShareButton>
              </ShareButtonWrapper>

              <ShareButtonWrapper>
                <InstapaperShareButton url={post.link} title={post.title}>
                  <IconWrapperStyle>
                    <InstapaperIcon size={32} round />
                  </IconWrapperStyle>
                </InstapaperShareButton>
              </ShareButtonWrapper>

              <ShareButtonWrapper>
                <TelegramShareButton url={post.link} title={post.title}>
                  <IconWrapperStyle>
                    <TelegramIcon size={32} round />
                  </IconWrapperStyle>
                </TelegramShareButton>
              </ShareButtonWrapper>

              <ShareButtonWrapper>
                <LinkedinShareButton url={post.link} title={post.title}>
                  <IconWrapperStyle>
                    <CoverImgStyle alt="post cover" src={LINKEDIN_IMG_URL} />
                  </IconWrapperStyle>
                </LinkedinShareButton>
              </ShareButtonWrapper>

              <ShareButtonWrapper>
                <MailruShareButton url={post.link} title={post.title}>
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
                    backgroundColor: theme.palette.background.default,
                  }}
                >
                  <Stack spacing={1} direction="row" alignItems="center">
                    <Box sx={{ p: 0.1 }}>
                      <img src="/static/home/gmail.png" alt="gmail" />
                    </Box>

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
                        subject={post.title}
                        body="body"
                      >
                        <Button type="submit" size="medium" variant="contained">
                          Share
                        </Button>
                      </EmailShareButton>
                    </ShareButtonWrapper>
                  </Stack>
                </Card>

                <Card
                  sx={{
                    p: (theme) => theme.spacing(1.25, 3),
                    backgroundColor: theme.palette.background.default,
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
