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
import { useDispatch, useSelector } from "../../../redux/store";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// hooks
import useAuth from "../../../hooks/useAuth";
// components
import DonatePaymentToken from "./DonatePaymentToken";
import DonatePaymentProfile from "./DonatePaymentProfile";
// ----------------------------------------------------------------------

const STEPS = ["1", "2"];

export default function DonatePayment() {
  const dispatch = useDispatch();
  const { user } = useAuth();

  return (
    <Box sx={{ pb: 10 }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={5}>
          <DonatePaymentProfile props={"props"} />
        </Grid>

        <Grid item xs={12} md={7}>
          <DonatePaymentToken props={"props"} />
        </Grid>
      </Grid>
    </Box>
  );
}
