import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import _ from "lodash";
import { Grid, Stack, Container, useTheme } from "@material-ui/core";
import {
  DonateCover,
  DonateList,
  DonateRight,
  DonateStories,
} from "../components/_external-pages/donate";
import Page from "../components/Page";
import { getPost } from "../redux/slices/donate";
import LoadingScreen from "../components/LoadingScreen";
import { useDispatch, useSelector } from "../redux/store";

// ----------------------------------------------------------------------

export default function Donate() {
  const theme = useTheme();
  const params = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const { post, isLoading } = useSelector((state) => state.donate);

  useEffect(() => {
    dispatch(getPost(params.id));
  }, [dispatch]);

  useEffect(() => {
    setData(post);
  }, [post]);

  if (isLoading || !data) {
    return (
      <LoadingScreen
        sx={{
          top: 0,
          left: 0,
          width: 1,
          zIndex: 9999,
          position: "fixed",
        }}
      />
    );
  }

  return (
    <Page
      title="Donate"
      sx={{
        paddingTop: (theme) => theme.spacing(theme.shape.PAGE_TOP_PADDING),
        paddingBottom: (theme) =>
          theme.spacing(theme.shape.PAGE_BOTTOM_PADDING),
      }}
    >
      <Container>
        <Grid container spacing={theme.shape.MAIN_HORIZONTAL_SPACING}>
          <Grid item xs={12} md={7}>
            <Stack spacing={theme.shape.MAIN_VERTICAL_SPACING}>
              <DonateCover />
              <DonateStories />
              <DonateList />
            </Stack>
          </Grid>

          <Grid item xs={12} md={5}>
            <DonateRight />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
