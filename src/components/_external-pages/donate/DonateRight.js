import { useState, useEffect, useCallback } from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { capitalCase } from "change-case";
import { useMoralis } from "react-moralis";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Box,
  Tab,
  Tabs,
  Link,
  Card,
  Stack,
  Button,
  Divider,
  Tooltip,
  TextField,
  IconButton,
  Typography,
  CardContent,
} from "@material-ui/core";
import {
  useTheme,
  experimentalStyled as styled,
} from "@material-ui/core/styles";
import {
  varFadeIn,
  varFadeInUp,
  varWrapEnter,
  varFadeInRight,
} from "../../animate";
import Scrollbar from "../../Scrollbar";
import DonateDialog from "./DonateDialog";
import OutlineCard from "../../custom-component/OutlineCard";
import { filters } from "src/utils/constants";
import { fCurrency, fPercent } from "src/utils/formatNumber";
import { useDispatch, useSelector } from "../../../redux/store";
import ConnectButton from "../../custom-component/ConnectButton";
import { PATH_DASHBOARD, PATH_PAGE } from "../../../routes/paths";
import FundraiseShareDialog from "../fundraise/FundraiseShareDialog";
import { getMorePosts, getPostsInitial } from "../../../redux/slices/donate";
import DonateHitory from "./DonateHistory";
import DonateAbout from "./DonateAbout";

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "popular", label: "Popular" },
  { value: "oldest", label: "Oldest" },
];

const applySort = (posts, sortBy) => {
  if (sortBy === "latest") {
    return orderBy(posts, ["createdAt"], ["desc"]);
  }
  if (sortBy === "oldest") {
    return orderBy(posts, ["createdAt"], ["asc"]);
  }
  if (sortBy === "popular") {
    return orderBy(posts, ["view"], ["desc"]);
  }
  return posts;
};

DonateRight.propTypes = {};

export default function DonateRight() {
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState("About");

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <>
      <OutlineCard>
        <Tabs
          value={currentTab}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={handleChangeTab}
        >
          {["About", "History"].map((tab) => (
            <Tab
              disableRipple
              key={tab}
              value={tab}
              label={capitalCase(tab)}
              sx={{ px: 3 }}
            />
          ))}
        </Tabs>

        <Divider />

        {currentTab === "About" && <DonateAbout />}

        {currentTab === "History" && (
          // <Scrollbar sx={{ maxHeight: 450 }}>
          <DonateHitory />
          // </Scrollbar>
        )}
      </OutlineCard>
    </>
  );
}
