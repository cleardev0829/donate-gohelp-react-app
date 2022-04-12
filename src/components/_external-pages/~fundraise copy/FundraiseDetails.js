import { useCallback, useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import _ from "lodash";
import moment from "moment";
import numeral from "numeral";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useSnackbar } from "notistack";
import { capitalCase } from "change-case";
import {
  alpha,
  useTheme,
  experimentalStyled as styled,
} from "@material-ui/core/styles";
import {
  Box,
  Tab,
  Tabs,
  Card,
  Grid,
  Stack,
  Button,
  Container,
  Typography,
} from "@material-ui/core";
import {
  varFadeIn,
  varFadeInUp,
  varWrapEnter,
  varFadeInRight,
} from "../../animate";
import {
  onBackStep,
  onNextStep,
  getPost,
} from "../../../redux/slices/fundraise";
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
import { FundraiseHeader } from ".";
import { PATH_PAGE } from "src/routes/paths";
import DonateProgress from "../../DonateProgress";
import { fNumber } from "../../../utils/formatNumber";
import { diff, filters } from "../../../utils/constants";
import FundraiseShareDialog from "./FundraiseShareDialog";
import { useDispatch, useSelector } from "../../../redux/store";
import { CardMediaStyle, CoverImgStyle } from "src/components/CommonStyles";

// ----------------------------------------------------------------------

const TABS = [
  {
    value: "Donation",
    component: <Box />,
  },
  // {
  //   value: "Team",
  //   component: <Box />,
  // },
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
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.fundraise);
  const isLight = theme.palette.mode === "light";
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("profile");
  const [data, setData] = useState({});
  const [filter, setFilter] = useState(filters([]));

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch]);

  useEffect(() => {
    if (_.isEmpty(post)) return;

    setData(post);
    setFilter(filters(post.donates));
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

  if (_.isEmpty(data)) {
    return null;
  }

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
        <FundraiseHeader
          continueTitle="Share"
          cancelButton={false}
          cancelAction={handleBackStep}
          continueAction={handleOpenPreview}
        />

        <Container maxWidth="lg">
          <Stack spacing={theme.shape.MAIN_VERTICAL_SPACING}>
            <Grid container spacing={theme.shape.MAIN_HORIZONTAL_SPACING}>
              <Grid item xs={12} md={5}>
                <Card sx={{ position: "relative" }}>
                  <CardMediaStyle>
                    <CoverImgStyle
                      alt={"cover"}
                      src={data.cover.preview}
                      sx={{
                        transform: `rotate(${
                          ((-1 * data.cover.rotate) % 4) * 90
                        }deg) scale(${1 + data.cover.scale / 100})`,
                      }}
                    />
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
                    variant="h5"
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
                        component={RouterLink}
                        to={`${PATH_PAGE.fundraiseEdit}/${id}`}
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
                        to={`${PATH_PAGE.donate}/${id}`}
                        startIcon={<Icon icon="akar-icons:eye" />}
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

                  <DonateProgress
                    time={diff(moment(), moment(data.createdAt))}
                    total={filter.totalAmount}
                    goal={parseFloat(data.goal)}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  fullWidth
                  variant="contained"
                  color="inherit"
                  component={RouterLink}
                  to={`${PATH_PAGE.fundraiseUpdate}/${id}`}
                  sx={{
                    mr: 1.5,
                    color: "text.primary",
                    backgroundColor: (theme) => theme.palette.background.paper,
                  }}
                >
                  Update
                </Button>
              </Grid>
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
                      variant="body2"
                      color={(theme) => theme.palette.common.black}
                    >
                      Dud you know? Sharing on Facebook can increase your
                      donation as much as 350%
                    </Typography>
                  </Stack>

                  {/* <FacebookShareButton url={""}>
                    <Button variant="contained">Share on Facebook</Button>
                  </FacebookShareButton> */}

                  <Button variant="contained">Share on Facebook</Button>
                </Stack>
              </Card>
            </Grid>

            <Card
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
                      <Typography variant="h5">
                        Get your first donation by sharing
                      </Typography>

                      <Typography
                        gutterBottom
                        variant="body2"
                        sx={{ display: "block", mt: 2 }}
                      >
                        Share your fundraiser regularly with your social
                        networks for the most success. Check in and personally
                        ask friends to donate or share.
                      </Typography>

                      <motion.div variants={varFadeInRight}>
                        <Button variant="contained" onClick={handleOpenPreview}>
                          Share fundraiser
                        </Button>
                      </motion.div>
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
            </Card>
          </Stack>
        </Container>
      </Container>

      <FundraiseShareDialog
        post={data}
        open={open}
        onClose={handleClosePreview}
      />
    </>
  );
}
