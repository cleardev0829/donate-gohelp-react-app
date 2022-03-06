import React from "react";
// material
import { experimentalStyled as styled } from "@material-ui/core/styles";
// components
import Page from "../components/Page";
import {
  LandingHero,
  LandingBottom,
  LandingBuild,
  LandingScale,
  LandingMonitor,
  LandingAdvertisement,
  TopFundraisers,
  StartFundraise,
  DonateCategories,
  DonateCategoryCard,
  LandingHugePackElements,
  OnlineFundraising,
} from "../components/_external-pages/landing";

// hooks
import useSettings from "../hooks/useSettings";

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
  return (
    <RootStyle title="Go Help Website" id="move_top">
      <LandingHero />
      <ContentStyle>
        <TopFundraisers />
        <StartFundraise />
        <DonateCategories />
        <OnlineFundraising />
        {/* <LandingBottom /> */}
      </ContentStyle>
    </RootStyle>
  );
}
