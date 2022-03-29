import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
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
  experimentalStyled as styled,
  useTheme,
} from "@material-ui/core/styles";
import {
  Box,
  Card,
  Grid,
  Stack,
  Button,
  MenuItem,
  Checkbox,
  TextField,
  Container,
  Typography,
  InputAdornment,
  FormHelperText,
} from "@material-ui/core";
import fakeRequest from "../../../utils/fakeRequest";
import { getPost, deletePost } from "../../../redux/slices/fundraise";
import { FundraiseHeader } from ".";
import { FundraiseEditOverView } from ".";
import { FundraiseEditPhoto } from ".";
import { FundraiseEditStory } from ".";

// ----------------------------------------------------------------------

const TABS = [
  {
    value: "Over View",
    component: <Box />,
  },
  {
    value: "Photo",
    component: <Box />,
  },
  {
    value: "Story",
    component: <Box />,
  },
];

export default function FundraiseEdit() {
  const theme = useTheme();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { post } = useSelector((state) => state.fundraise);
  const isLight = theme.palette.mode === "light";
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(post);
  const [formik, setFormik] = useState(null);
  const [currentTab, setCurrentTab] = useState("Over View");

  useEffect(() => {
    dispatch(getPost(params.id));
  }, [dispatch]);

  useEffect(() => {
    setData(post);
  }, [post]);

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
    formik.handleSubmit();
  };

  const handleTab = (val) => {
    setCurrentTab(val);
  };

  const handleDelete = () => {
    dispatch(deletePost(params.id));
    navigate("/");
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
          cancelTitle="Cancel"
          continueTitle="Save Changes"
          cancelAction={handleCancel}
          continueAction={handleSubmit}
        />

        <Container maxWidth="md">
          <Stack spacing={theme.shape.MAIN_VERTICAL_SPACING}>
            <Card
              sx={{
                p: theme.shape.CARD_PADDING,
              }}
            >
              <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
                <Typography variant="h3" sx={{ color: "text.primary" }}>
                  Edit and settings
                </Typography>
                <Typography variant="h5" sx={{ color: "text.primary" }}>
                  Make changes in your Fundraising.
                </Typography>

                <Stack
                  direction="row"
                  spacing={theme.shape.CARD_CONTENT_SPACING}
                >
                  {TABS.map((tab) => (
                    <Button
                      key={tab.value}
                      color="inherit"
                      variant="outlined"
                      onClick={() => handleTab(tab.value)}
                    >
                      {tab.value}
                    </Button>
                  ))}
                </Stack>

                {currentTab === "Over View" && (
                  <FundraiseEditOverView renderForm={setFormik} post={data} />
                )}

                {currentTab === "Photo" && (
                  <FundraiseEditPhoto renderForm={setFormik} post={data} />
                )}

                {currentTab === "Story" && (
                  <FundraiseEditStory renderForm={setFormik} post={data} />
                )}
              </Stack>
            </Card>

            {currentTab === "Over View" && (
              <Card
                sx={{
                  p: theme.shape.CARD_PADDING,
                }}
              >
                <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
                  <Typography
                    variant="h4"
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
                    Delete my fundraiser
                  </Typography>

                  <Grid container xs={12}>
                    <Grid item xs={12} sm={7}>
                      <Typography
                        variant="p1"
                        sx={{
                          color: "#A1A1A1",
                          ...(!isLight && {
                            textShadow: (theme) =>
                              `4px 4px 16px ${alpha(
                                theme.palette.grey[800],
                                0.48
                              )}`,
                          }),
                        }}
                      >
                        You will no longer hav e access to this fundraiser after
                        deleting. If you receive donation. Your donation will be
                        still able to view a summary.
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={5}
                      sx={{
                        display: "flex",
                        justifyContent: { xs: "center", sm: "flex-end" },
                        alignItems: "flex-start",
                      }}
                    >
                      <Button
                        size="middle"
                        type="button"
                        variant="contained"
                        color="error"
                        onClick={handleDelete}
                      >
                        Delete Fundraiser
                      </Button>
                    </Grid>
                  </Grid>
                </Stack>
              </Card>
            )}
          </Stack>
        </Container>
      </Container>
    </>
  );
}
