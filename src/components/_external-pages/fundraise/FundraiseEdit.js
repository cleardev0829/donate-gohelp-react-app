import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Icon } from "@iconify/react";
import { useSnackbar } from "notistack";
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
  MenuItem,
  Checkbox,
  TextField,
  Container,
  Typography,
  InputAdornment,
  FormHelperText,
} from "@material-ui/core";
import { FundraiseHeader } from ".";
import { FundraiseEditPhoto } from ".";
import { FundraiseEditStory } from ".";
import { FundraiseEditOverView } from ".";
import { PATH_PAGE } from "src/routes/paths";
import Loading from "../../../components/Loading";
import fakeRequest from "../../../utils/fakeRequest";
import LoadingScreen from "src/components/LoadingScreen";
import { useDispatch, useSelector } from "../../../redux/store";
import { getPost, deletePost } from "../../../redux/slices/fundraise";

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

FundraiseEdit.propTypes = {
  uid: PropTypes.string,
  childRef: PropTypes.object,
  open: PropTypes.bool,
  onclose: PropTypes.func,
};

export default function FundraiseEdit({ uid, childRef }) {
  const theme = useTheme();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [formik, setFormik] = useState(null);
  const isLight = theme.palette.mode === "light";
  const [currentTab, setCurrentTab] = useState("Over View");
  const { post, isLoading } = useSelector((state) => state.fundraise);
  const [data, setData] = useState(null);

  useEffect(() => {
    dispatch(getPost(uid));
  }, [dispatch]);

  useEffect(() => {
    setData(post);
  }, [post]);

  const handleTab = (val) => {
    setCurrentTab(val);
  };

  const handleDelete = () => {
    dispatch(deletePost(uid));
    navigate(`${PATH_PAGE.fundraisers}`);
  };

  if (!data) {
    return <Loading />;
  }

  return (
    <Stack spacing={theme.shape.MAIN_VERTICAL_SPACING}>
      <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
        {/* <Typography variant="h5" sx={{ color: "text.primary" }}>
          Edit and settings
        </Typography> */}
        {/* <Typography variant="subtitle1" sx={{ color: "text.primary" }}>
          Make changes in your Fundraising.
        </Typography> */}

        <Stack direction="row" spacing={theme.shape.CARD_CONTENT_SPACING}>
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
          <FundraiseEditOverView uid={uid} post={data} childRef={childRef} />
        )}

        {currentTab === "Photo" && (
          <FundraiseEditPhoto post={data} childRef={childRef} />
        )}

        {currentTab === "Story" && (
          <FundraiseEditStory post={data} childRef={childRef} />
        )}
      </Stack>

      {currentTab === "Over View" && (
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
            Delete my fundraiser
          </Typography>

          <Grid container xs={12}>
            <Grid item xs={12} sm={7}>
              <Typography
                variant="body2"
                sx={{
                  color: "#A1A1A1",
                  ...(!isLight && {
                    textShadow: (theme) =>
                      `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`,
                  }),
                }}
              >
                You will no longer hav e access to this fundraiser after
                deleting. If you receive donation. Your donation will be still
                able to view a summary.
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
      )}
    </Stack>
  );
}
