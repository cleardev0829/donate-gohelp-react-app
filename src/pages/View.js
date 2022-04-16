import { useCallback, useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import _ from "lodash";
import moment from "moment";
import numeral from "numeral";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useSnackbar } from "notistack";
import { capitalCase } from "change-case";
import { FacebookShareButton } from "react-share";
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
} from "../components/animate";
import {
  FundraiseEditDialog,
  FundraiseUpdateDialog,
} from "../components/_external-pages/fundraise";
import Loading from "../components/Loading";
import { PATH_PAGE } from "../routes/paths";
import { diff, filters } from "../utils/constants";
import { useDispatch, useSelector } from "../redux/store";
import DonateProgress from "../components/DonateProgress";
import { CardMediaStyle, CoverImgStyle } from "../components/CommonStyles";
import { onBackStep, onNextStep, getPost } from "../redux/slices/fundraise";
import FundraiseHeader from "../components/_external-pages/fundraise/FundraiseHeader";
import FundraiseShareDialog from "../components/_external-pages/fundraise/FundraiseShareDialog";
import Page from "src/components/Page";

// ----------------------------------------------------------------------

const TABS = [
  {
    value: "Donation",
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

export default function View() {
  const theme = useTheme();
  const params = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const isLight = theme.palette.mode === "light";
  const [openEdit, setOpenEdit] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [filter, setFilter] = useState(filters([]));
  const [currentTab, setCurrentTab] = useState("profile");
  const { post } = useSelector((state) => state.fundraise);

  useEffect(() => {
    dispatch(getPost(params.id));
  }, [dispatch]);

  useEffect(() => {
    if (_.isEmpty(post)) return;

    setData(post);
    setFilter(filters(post.donates));
  }, [post]);

  const handleOpenShare = () => {
    setOpenShare(true);
  };

  const handleCloseShare = () => {
    setOpenShare(false);
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
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
    return <Loading />;
  }

  return (
    <>
      <Page
        sx={{
          paddingTop: (theme) => theme.spacing(theme.shape.PAGE_TOP_PADDING),
          paddingBottom: (theme) =>
            theme.spacing(theme.shape.PAGE_BOTTOM_PADDING),
        }}
      >
        <Container maxWidth="lg">
          <FundraiseHeader
            continueTitle="Share"
            cancelButton={false}
            cancelAction={handleBackStep}
            continueAction={handleOpenShare}
          />

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
                  sx={{ height: "100%", py: theme.shape.MAIN_VERTICAL_SPACING }}
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
                        variant="outlined"
                        startIcon={<Icon icon="akar-icons:edit" />}
                        onClick={handleOpenEdit}
                      >
                        Edit and settings
                      </Button>
                    </motion.div>
                    <motion.div variants={varFadeInRight}>
                      <Button
                        variant="outlined"
                        component={RouterLink}
                        to={`${PATH_PAGE.donate}/${params.id}`}
                        startIcon={<Icon icon="akar-icons:eye" />}
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
                  variant="outlined"
                  // component={RouterLink}
                  // to={`${PATH_PAGE.fundraiseUpdate}/${params.id}`}
                  onClick={handleOpenUpdate}
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

                  <FacebookShareButton url={""}>
                    <Button variant="contained">Share on Facebook</Button>
                  </FacebookShareButton>
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
            </Card> */}
          </Stack>
        </Container>
      </Page>

      <FundraiseShareDialog
        post={data}
        open={openShare}
        onClose={handleCloseShare}
      />

      <FundraiseEditDialog
        uid={data.uid}
        open={openEdit}
        onClose={handleCloseEdit}
      />

      <FundraiseUpdateDialog
        uid={data.uid}
        open={openUpdate}
        onClose={handleCloseUpdate}
      />
    </>
  );
}
