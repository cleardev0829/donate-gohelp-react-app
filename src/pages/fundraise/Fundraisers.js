import React from "react";
import { experimentalStyled as styled } from "@material-ui/core/styles";
import Page from "../../components/Page";
import { YourFundraisers } from "../../components/_external-pages/landing";
import { useDispatch, useSelector } from "../../redux/store";
import { resetCheckout as resetFundraise } from "../../redux/slices/fundraise";
import { resetCheckout as resetDonate } from "../../redux/slices/donate";

// ----------------------------------------------------------------------

const ContentStyle = styled("div")(({ theme }) => ({
  overflow: "hidden",
  position: "relative",
  backgroundColor: theme.palette.background.body,
}));

export default function Fundraisers() {
  const dispatch = useDispatch();
  dispatch(resetFundraise());
  dispatch(resetDonate());

  return (
    <Page
      title="Fundraise"
      sx={{
        paddingTop: (theme) => theme.spacing(theme.shape.PAGE_TOP_PADDING),
        paddingBottom: (theme) =>
          theme.spacing(theme.shape.PAGE_BOTTOM_PADDING),
      }}
    >
      <ContentStyle>
        <YourFundraisers />
      </ContentStyle>
    </Page>
  );
}
