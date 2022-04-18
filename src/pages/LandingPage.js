import React, { useEffect } from "react";
import { experimentalStyled as styled } from "@material-ui/core/styles";
import {
  LandingHero,
  LandingBottom,
  TopFundraisers,
  StartFundraise,
  DonateCategories,
  OnlineFundraise,
} from "../components/_external-pages/landing";
import Page from "../components/Page";
import MainFooter from "../layouts/main/MainFooter";
import { useDispatch, useSelector } from "../redux/store";
// import { resetCheckout as resetDonate } from "../redux/slices/donate";
import { resetCheckout as resetFundraise } from "../redux/slices/fundraise";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: "100%",
});

const ContentStyle = styled("div")(({ theme }) => ({
  overflow: "hidden",
  position: "relative",
  backgroundColor: theme.palette.background.default,
}));

export default function LandingPage() {
  const dispatch = useDispatch();
  // dispatch(resetDonate());
  dispatch(resetFundraise());

  return (
    <RootStyle title="Go Help Website" id="move_top">
      <LandingHero />
      <ContentStyle>
        <TopFundraisers />
        <StartFundraise />
        {/* <DonateCategories /> */}
        <OnlineFundraise />
        {/* <LandingBottom /> */}
        <MainFooter />
      </ContentStyle>
    </RootStyle>
  );
}
