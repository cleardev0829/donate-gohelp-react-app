import _ from "lodash";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { capitalCase } from "change-case";
import { Form, FormikProvider, useFormik } from "formik";
import { motion } from "framer-motion";
import moment from "moment";
import { Link as RouterLink } from "react-router-dom";
import { PATH_DASHBOARD, PATH_PAGE } from "../../../routes/paths";
import { Icon } from "@iconify/react";
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
  CardContent,
  Grid,
  Chip,
  Link,
  Tabs,
  Tab,
  Stack,
  Button,
  Switch,
  Container,
  TextField,
  Typography,
  Autocomplete,
  FormHelperText,
  FormControlLabel,
} from "@material-ui/core";
// utils
import fakeRequest from "../../../utils/fakeRequest";

import {
  varFadeIn,
  varFadeInUp,
  varWrapEnter,
  varFadeInRight,
} from "../../animate";
import ProgressItem from "../../ProgressItem";
import { useDispatch, useSelector } from "../../../redux/store";
import {
  onBackStep,
  onNextStep,
  getPost,
} from "../../../redux/slices/fundraise";
import { FundraiseHeader } from ".";
import { CardMediaStyle, CoverImgStyle } from "../landing/TopFundraiserCard";
import { fNumber, fCurrency, fPercent } from "../../../utils/formatNumber";
import { diff } from "../../../utils/constants";

// ----------------------------------------------------------------------

const TABS = [
  {
    value: "Donation",
    component: <Box />,
  },
  {
    value: "Team",
    component: <Box />,
  },
  {
    value: "Updates",
    component: <Box />,
  },
  {
    value: "Invite supporters",
    component: <Box />,
  },
];

const IMG = (index) => `/static/fundraisers/fundraiser_${index}.png`;

const FacebookImgStyle = styled("img")({
  width: 40,
  height: 40,
});

export const ImgStyle = styled("img")(({ theme }) => ({
  top: 0,
  // width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
  borderRadius: 8,
  padding: theme.spacing(1),
}));

const TabsWrapperStyle = styled("div")(({ theme }) => ({
  zIndex: 9,
  width: "100%",
  display: "flex",
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up("sm")]: {
    justifyContent: "flex-start",
  },
  [theme.breakpoints.up("md")]: {
    justifyContent: "flex-start",
    paddingRight: theme.spacing(3),
  },
}));
// ----------------------------------------------------------------------

export default function FundraiseDetails() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { checkout, post } = useSelector((state) => state.fundraise);
  const { uid } = checkout;
  const isLight = theme.palette.mode === "light";
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("profile");
  const [data, setData] = useState({});

  useEffect(() => {
    dispatch(getPost(uid));
  }, [dispatch]);

  useEffect(() => {
    setData(post);
  }, [post]);

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleBackStep = () => {
    dispatch(onBackStep());
  };

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    content: Yup.string().min(1000).required("Content is required"),
    cover: Yup.mixed().required("Cover is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: checkout.title,
      description: checkout.description,
      content: "",
      cover: checkout.cover,
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await fakeRequest(500);
        resetForm();
        handleClosePreview();
        setSubmitting(false);
        enqueueSnackbar("Post success", { variant: "success" });
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

  if (_.isEmpty(data)) {
    return null;
  }

  return (
    <>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <FundraiseHeader
            continueTitle="Share"
            cancelAction={handleBackStep}
            continueAction={handleNextStep}
          />

          <Container maxWidth="lg" sx={{ pt: 10 }}>
            <Stack spacing={theme.shape.MAIN_VERTICAL_SPACING}>
              <Grid container spacing={theme.shape.MAIN_HORIZONTAL_SPACING}>
                <Grid item xs={12} md={5}>
                  <Card sx={{ position: "relative" }}>
                    <CardMediaStyle>
                      <CoverImgStyle alt={"cover"} src={data.coverUrl} />
                    </CardMediaStyle>
                  </Card>
                </Grid>

                <Grid item xs={12} md={5}>
                  <Stack
                    spacing={theme.shape.CARD_CONTENT_SPACING}
                    justifyContent="space-between"
                    sx={{ height: "100%", py: 1 }}
                  >
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
                      {data.title}
                    </Typography>

                    <Stack direction="row" justifyContent="space-between">
                      <motion.div variants={varFadeInRight}>
                        <Button
                          variant="contained"
                          color="inherit"
                          // component={RouterLink}
                          // to={PATH_PAGE.page404}
                          startIcon={<Icon icon="akar-icons:edit" />}
                          sx={{
                            color: "text.primary",
                            backgroundColor: (theme) =>
                              theme.palette.background.paper,
                          }}
                        >
                          Edit and settings
                        </Button>
                      </motion.div>
                      <motion.div variants={varFadeInRight}>
                        <Button
                          variant="contained"
                          color="inherit"
                          component={RouterLink}
                          // to={PATH_PAGE.page404}
                          // startIcon={<Icon icon="akar-icons:eye" />}
                          sx={{
                            color: "text.primary",
                            backgroundColor: (theme) =>
                              theme.palette.background.paper,
                          }}
                        >
                          View fundraiser
                        </Button>
                      </motion.div>
                    </Stack>

                    <ProgressItem
                      text={`Last donation ${diff(
                        moment(),
                        moment(data.createdAt)
                      )} `}
                      progress={{
                        value: fPercent((data.total * 100) / data.goal),
                      }}
                    />

                    <Typography
                      gutterBottom
                      variant="h6"
                      sx={{ display: "block", mt: 2 }}
                    >
                      {`${fNumber(data.total)} token raised of ${fNumber(
                        data.goal
                      )} Token`}
                    </Typography>
                  </Stack>
                </Grid>
                {/* <Grid item xs={12} md={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="inherit"
                    onClick={handleOpenPreview}
                    sx={{
                      mr: 1.5,
                      color: "text.primary",
                      backgroundColor: (theme) =>
                        theme.palette.background.paper,
                    }}
                  >
                    Update
                  </Button>
                </Grid> */}
              </Grid>

              <Grid container>
                <Card
                  sx={{
                    px: 1,
                    py: 1.5,
                    width: "100%",
                    backgroundColor: (theme) => theme.palette.common.white,
                  }}
                >
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={1}
                  >
                    <Stack spacing={2} direction="row" alignItems="center">
                      <FacebookImgStyle
                        alt="post cover"
                        src="/static/socials/Facebook.png"
                      />
                      <Typography
                        variant="h7"
                        color={(theme) => theme.palette.common.black}
                      >
                        Dud you know? Sharing on Facebook can increase your
                        donation as much as 350%
                      </Typography>
                    </Stack>

                    <Button variant="contained">Share on Facebook</Button>
                  </Stack>
                </Card>
              </Grid>

              {/* <Card
                sx={{
                  p: theme.shape.CARD_PADDING,
                }}
              >
                <Stack spacing={0.1}>
                  <Grid container xs={12}>
                    <TabsWrapperStyle>
                      <Tabs
                        value={currentTab}
                        scrollButtons="auto"
                        variant="scrollable"
                        allowScrollButtonsMobile
                        onChange={handleChangeTab}
                      >
                        {TABS.map((tab) => (
                          <Tab
                            disableRipple
                            key={tab.value}
                            value={tab.value}
                            label={capitalCase(tab.value)}
                            sx={{ px: 3 }}
                          />
                        ))}
                      </Tabs>
                    </TabsWrapperStyle>
                  </Grid>

                  <Grid container spacing={5}>
                    <Grid item xs={12} md={3}>
                      <CardMediaStyle>
                        <ImgStyle
                          alt={"title"}
                          src={"/static/home/social-marketing.png"}
                        />
                      </CardMediaStyle>
                    </Grid>

                    <Grid item xs={12} md={9}>
                      <Stack
                        spacing={2}
                        justifyContent="space-between"
                        sx={{ height: "100%" }}
                      >
                        <Typography variant="h3">
                          Get your first donation by sharing
                        </Typography>

                        <Typography
                          gutterBottom
                          variant="p2"
                          sx={{ display: "block", mt: 2 }}
                        >
                          Share your fundraiser regularly with your social
                          networks for the most success. Check in and personally
                          ask friends to donate or share.
                        </Typography>

                        <motion.div variants={varFadeInRight}>
                          <Button
                            variant="contained"
                            // component={RouterLink}
                            // to={PATH_PAGE.page404}
                          >
                            Share fundraiser
                          </Button>
                        </motion.div>
                      </Stack>
                    </Grid>
                  </Grid>
                </Stack>
              </Card> */}
            </Stack>
          </Container>
        </Form>
      </FormikProvider>

      {/* <BlogNewPostPreview formik={formik} openPreview={open} onClosePreview={handleClosePreview} /> */}
    </>
  );
}
