import { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import _ from "lodash";
import { Icon } from "@iconify/react";
import { capitalCase } from "change-case";
import { useMoralis } from "react-moralis";
import {
  Box,
  Tab,
  Tabs,
  Grid,
  Stack,
  Avatar,
  Divider,
  useTheme,
  Container,
  Typography,
} from "@material-ui/core";
import Page from "../components/Page";
import { getPost } from "../redux/slices/fundraise";
import useIsMountedRef from "../hooks/useIsMountedRef";
import LoadingScreen from "../components/LoadingScreen";
import { useDispatch, useSelector } from "../redux/store";
import {
  Favorite,
  Fundraiser,
  History,
  NFT,
} from "../components/_external-pages/profile";
import { OneLineTextStyle } from "../components/CommonStyles";

// ----------------------------------------------------------------------

export default function Profile() {
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState("fundraiser");
  const { account } = useMoralis();

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Page
      title="Profile"
      sx={{
        paddingTop: (theme) => theme.spacing(theme.shape.PAGE_TOP_PADDING),
        paddingBottom: (theme) =>
          theme.spacing(theme.shape.PAGE_BOTTOM_PADDING),
      }}
    >
      <Container maxWidth="lg">
        <Divider />
        <Stack
          spacing={theme.shape.MAIN_HORIZONTAL_SPACING}
          direction="row"
          alignItems="center"
          sx={{ py: theme.shape.MAIN_SPACING, pr: 3 }}
        >
          <Avatar>
            <Icon icon="logos:metamask-icon" />
          </Avatar>
          <OneLineTextStyle>{account}</OneLineTextStyle>
        </Stack>
        <Divider />

        <Tabs
          value={currentTab}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={handleChangeTab}
        >
          {["fundraiser", "history", "favorite", "nft"].map((tab) => (
            <Tab
              disableRipple
              key={tab}
              value={tab}
              label={capitalCase(tab)}
              sx={{ px: 3 }}
            />
          ))}
        </Tabs>

        <Divider sx={{ mb: theme.shape.MAIN_VERTICAL_SPACING }} />

        {currentTab === "fundraiser" && <Fundraiser />}
        {currentTab === "history" && <History />}
        {currentTab === "favorite" && <Favorite />}
        {currentTab === "nft" && <NFT />}
      </Container>
    </Page>
  );
}
