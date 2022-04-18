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

// ----------------------------------------------------------------------

DonateAbout.propTypes = {};

export default function DonateAbout() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { isAuthenticated, isWeb3Enabled } = useMoralis();
  const { post } = useSelector((state) => state.donate);
  const [donateDlgOpen, setDonateDlgOpen] = useState(false);
  const filter = filters(post.donates);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDonateDlgOpen = () => {
    setDonateDlgOpen(true);
  };

  const handleDonateDlgClose = () => {
    setDonateDlgOpen(false);
  };

  const handleShare = () => {
    handleOpen();
  };

  return (
    <>
      <CardContent>
        <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
          <Typography variant="subtitle1">{post.title}</Typography>
          <Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle2">Top donation</Typography>
              <Typography variant="subtitle2">
                {`${fCurrency(filter.topDonation.crypto.amount)}`}
              </Typography>
            </Stack>
            <Typography variant="h6" sx={{ color: "text.disabled" }} noWrap>
              {filter.topDonation.account}
            </Typography>
          </Stack>

          <Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle2">Recent donation</Typography>
              <Typography variant="subtitle2">
                {`${fCurrency(filter.recentDonation.crypto.amount)}`}
              </Typography>
            </Stack>
            <Typography variant="h6" sx={{ color: "text.disabled" }} noWrap>
              {filter.recentDonation.account}
            </Typography>
          </Stack>

          <Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle2">First donation</Typography>
              <Typography variant="subtitle2">
                {`${fCurrency(filter.firstDonation.crypto.amount)}`}
              </Typography>
            </Stack>
            <Typography variant="h6" sx={{ color: "text.disabled" }} noWrap>
              {filter.firstDonation.account}
            </Typography>
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack>
              <Typography variant="">Total donation</Typography>
              <Typography variant="subtitle2" sx={{ color: "text.disabled" }}>
                {`${filter.count} people donated`}
              </Typography>
            </Stack>
            <Typography variant="subtitle2">
              {`${fCurrency(filter.totalAmount)}`}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>

      <Divider />

      <CardContent>
        <Stack direction="row" justifyContent={"space-between"}>
          <motion.div variants={varFadeInRight}>
            <Button fullWidth variant="outlined" onClick={handleShare}>
              Share
            </Button>
          </motion.div>
          <motion.div variants={varFadeInRight}>
            {isWeb3Enabled && isAuthenticated ? (
              <Button variant="outlined" onClick={handleDonateDlgOpen}>
                Give
              </Button>
            ) : (
              <ConnectButton variant={"outlined"} />
            )}
          </motion.div>
        </Stack>
      </CardContent>

      <FundraiseShareDialog post={post} open={open} onClose={handleClose} />

      <DonateDialog
        post={post}
        open={donateDlgOpen}
        onClose={handleDonateDlgClose}
      />
    </>
  );
}
