import React from "react";
import { experimentalStyled as styled } from "@material-ui/core/styles";
import Page from "../components/Page";
import {
  LandingHero,
  LandingBottom,
  TopFundraisers,
  StartFundraise,
  DonateCategories,
  OnlineFundraise,
} from "../components/_external-pages/landing";
import { useDispatch, useSelector } from "../redux/store";
import { resetCheckout as resetFundraise } from "../redux/slices/fundraise";
import { resetCheckout as resetDonate } from "../redux/slices/donate";

import MainFooter from "src/layouts/main/MainFooter";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: "100%",
});

const ContentStyle = styled("div")(({ theme }) => ({
  overflow: "hidden",
  position: "relative",
  backgroundColor: theme.palette.background.body,
}));

export default function LandingPage() {
  const dispatch = useDispatch();
  dispatch(resetFundraise());
  dispatch(resetDonate());

  return (
    <RootStyle title="Go Help Website" id="move_top">
      <LandingHero />
      <ContentStyle>
        <TopFundraisers />
        <StartFundraise />
        <DonateCategories />
        <OnlineFundraise />
        <LandingBottom />
        <MainFooter />
      </ContentStyle>
    </RootStyle>
  );
}
