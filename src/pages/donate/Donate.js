import { Icon } from "@iconify/react";
import { capitalCase } from "change-case";
import { useEffect, useState } from "react";
import heartFill from "@iconify/icons-eva/heart-fill";
import peopleFill from "@iconify/icons-eva/people-fill";
import roundPermMedia from "@iconify/icons-ic/round-perm-media";
import roundAccountBox from "@iconify/icons-ic/round-account-box";
// material
import { experimentalStyled as styled } from "@material-ui/core/styles";
import {
  Grid,
  Stack,
  Tab,
  Box,
  Card,
  Tabs,
  Button,
  Container,
} from "@material-ui/core";
// redux
import { useDispatch, useSelector } from "../../redux/store";
import {
  getPosts,
  getGallery,
  getFriends,
  getProfile,
  getFollowers,
  onToggleFollow,
} from "../../redux/slices/user";
// routes
import { PATH_DASHBOARD } from "../../routes/paths";
// hooks
import useAuth from "../../hooks/useAuth";
// components
import Page from "../../components/Page";
import HeaderStepBreadcrumbs from "../../components/HeaderStepBreadcrumbs";
import DonateList from "../../components/_external-pages/donate/DonateList";
import DonateSupports from "../../components/_external-pages/donate/DonateSupports";
import DonateToken from "../../components/_external-pages/donate/DonateToken";
import DonateProfile from "../../components/_external-pages/donate/DonateProfile";
import {
  DonateComplete,
  DonateMain,
  DonatePayment,
} from "src/components/_external-pages/donate";
import useIsMountedRef from "../../hooks/useIsMountedRef";

import {
  getCart,
  createBilling,
  onNextStep,
  onBackStep,
  onGotoStep,
} from "../../redux/slices/donate";
// ----------------------------------------------------------------------

const STEPS = ["1", "2"];

export default function UserProfile() {
  const dispatch = useDispatch();

  const { user } = useAuth();

  const isMountedRef = useIsMountedRef();
  const { checkout } = useSelector((state) => state.donate);
  const { cart, billing, activeStep } = checkout;
  const isComplete = activeStep === STEPS.length;

  const { myProfile, posts, followers, friends, gallery } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isMountedRef.current) {
      dispatch(getCart(cart));
    }
  }, [dispatch, isMountedRef, cart]);

  useEffect(() => {
    if (activeStep === 1) {
      dispatch(createBilling(null));
    }
  }, [dispatch, activeStep]);

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const handleBackStep = () => {
    dispatch(onBackStep());
  };

  const handleGotoStep = (step) => {
    dispatch(onGotoStep(step));
  };

  if (!myProfile) {
    return null;
  }

  return (
    <Page title="Donate" sx={{ paddingTop: (theme) => theme.spacing(20) }}>
      {activeStep !== -1 && (
        <Container maxWidth="lg">
          <HeaderStepBreadcrumbs
            heading="Checkout"
            links={[
              { name: "Dashboard", href: PATH_DASHBOARD.root },
              {
                name: "E-Commerce",
                href: PATH_DASHBOARD.eCommerce.root,
              },
              { name: "Checkout" },
            ]}
            cancelAction={
              <Button variant="outlined" onClick={handleBackStep}>
                Back
              </Button>
            }
            continueAction={
              <Button variant="contained" onClick={handleNextStep}>
                Continue
              </Button>
            }
          />
        </Container>
      )}

      <Container>
        {!isComplete ? (
          <>
            {activeStep === -1 && <DonateMain />}
            {activeStep === 0 && <DonatePayment />}
            {activeStep === 1 && <DonatePayment />}
          </>
        ) : (
          <DonateComplete open={isComplete} />
        )}
      </Container>
    </Page>
  );
}