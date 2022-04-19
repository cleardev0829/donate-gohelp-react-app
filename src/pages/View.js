import { useCallback, useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import _ from "lodash";
import { useSnackbar } from "notistack";
import {
  useTheme,
  experimentalStyled as styled,
} from "@material-ui/core/styles";
import { Grid, Stack, Button, Container } from "@material-ui/core";
import {
  FundraiseShareDialog,
  FundraiseUpdateDialog,
} from "../components/_external-pages/fundraise";
import Page from "../components/Page";
import { useDispatch, useSelector } from "../redux/store";
import Loading from "../components/custom-component/Loading";
import { Cover, Facebook, Main } from "../components/_external-pages/view";
import { onBackStep, onNextStep, getPost } from "../redux/slices/fundraise";
import FundraiseHeader from "../components/_external-pages/fundraise/FundraiseHeader";

// ----------------------------------------------------------------------

export default function View() {
  const theme = useTheme();
  const params = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const isLight = theme.palette.mode === "light";
  const [openShare, setOpenShare] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const { post } = useSelector((state) => state.fundraise);

  useEffect(() => {
    dispatch(getPost(params.id));
  }, [dispatch]);

  useEffect(() => {
    setData(post);
  }, [post]);

  const handleOpenShare = () => {
    setOpenShare(true);
  };

  const handleCloseShare = () => {
    setOpenShare(false);
  };

  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleBackStep = () => {
    dispatch(onBackStep());
  };

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  if (_.isEmpty(data) || !data) {
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
                <Cover />
              </Grid>

              <Grid item xs={12} md={5}>
                <Main />
              </Grid>
              <Grid item xs={12} md={2}>
                <Button fullWidth variant="outlined" onClick={handleOpenUpdate}>
                  Update
                </Button>
              </Grid>
            </Grid>

            <Grid container>
              <Facebook />
            </Grid>
          </Stack>
        </Container>
      </Page>

      <FundraiseShareDialog
        post={data}
        open={openShare}
        onClose={handleCloseShare}
      />

      <FundraiseUpdateDialog
        uid={data.uid}
        open={openUpdate}
        onClose={handleCloseUpdate}
      />
    </>
  );
}
