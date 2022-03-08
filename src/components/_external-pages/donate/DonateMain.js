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
import DonateList from "./DonateList";
import DonateSupports from "./DonateSupports";
import DonateToken from "./DonateToken";
import DonateProfile from "./DonateProfile";
// ----------------------------------------------------------------------

const STEPS = ["1", "2"];

export default function UserProfile() {
  const dispatch = useDispatch();
  const { user } = useAuth();

  return (
    <Box>
      <Box>
        <Grid container spacing={9}>
          <Grid item xs={12} md={7}>
            <Stack spacing={3}>
              <DonateProfile props={"props"} />
              <DonateList props={"props"} />
            </Stack>
          </Grid>

          <Grid item xs={12} md={5}>
            <DonateToken props={"props"} />
          </Grid>
        </Grid>
      </Box>

      <DonateSupports props={"props"} />
    </Box>
  );
}
