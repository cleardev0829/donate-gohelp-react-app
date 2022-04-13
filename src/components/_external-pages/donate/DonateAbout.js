import { useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { capitalCase } from "change-case";
import { useMoralis } from "react-moralis";
import {
  Box,
  Tab,
  Tabs,
  Link,
  Card,
  Stack,
  Button,
  Divider,
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
import OutlineCard from "../../OutlineCard";
import { filters } from "src/utils/constants";
import { onNextStep } from "../../../redux/slices/donate";
import { fCurrency, fPercent } from "src/utils/formatNumber";
import { useDispatch, useSelector } from "../../../redux/store";
import { PATH_DASHBOARD, PATH_PAGE } from "../../../routes/paths";
import FundraiseShareDialog from "../fundraise/FundraiseShareDialog";
import { ConnectByMoralis } from "../../../components/ConnectByMoralis";

// ----------------------------------------------------------------------

DonateAbout.propTypes = {};

export default function DonateAbout() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { isAuthenticated, isWeb3Enabled } = useMoralis();
  const [isHidden, setHidden] = useState(true);
  const [currentTab, setCurrentTab] = useState("About");
  const [donateDlgOpen, setDonateDlgOpen] = useState(false);
  const { post, isLoading } = useSelector((state) => state.fundraise);
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

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <>
      <Box sx={{ py: 3 }}>
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
          <CardContent>
            {currentTab == "About" && (
              <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
                <Typography variant="subtitle1">{post.title}</Typography>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack>
                    <Typography variant="subtitle2">Top donation</Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "text.disabled" }}
                    >
                      address
                    </Typography>
                  </Stack>
                  <Typography variant="subtitle2">
                    {`${fCurrency(filter.maxAmount)}`}
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack>
                    <Typography variant="subtitle2">Recent donation</Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "text.disabled" }}
                    >
                      address
                    </Typography>
                  </Stack>
                  <Typography variant="subtitle2">
                    {`${fCurrency(filter.recentAmount)}`}
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack>
                    <Typography variant="subtitle2">First donation</Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "text.disabled" }}
                    >
                      address
                    </Typography>
                  </Stack>
                  <Typography variant="subtitle2">
                    {`${fCurrency(filter.firstAmount)}`}
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack>
                    <Typography variant="">Total donation</Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "text.disabled" }}
                    >
                      {`${filter.count} people donated`}
                    </Typography>
                  </Stack>
                  <Typography variant="subtitle2">
                    {`${fCurrency(filter.totalAmount)}`}
                  </Typography>
                </Stack>
              </Stack>
            )}
          </CardContent>

          {currentTab === "About" && (
            <>
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
                      <ConnectByMoralis variant={"outlined"} />
                    )}
                  </motion.div>
                </Stack>
              </CardContent>
            </>
          )}

          {currentTab === "History" && (
            <Scrollbar sx={{ maxHeight: 450 }}>
              <CardContent>
                <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
                  {post.donates.map((donate, index) => (
                    <OutlineCard key={`outlinecard-${index}`}>
                      <CardContent key={`cardcontent-${index}`}>
                        <Stack
                          key={`up-stack-${index}`}
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Stack key={`down-stack-${index}`}>
                            <Typography
                              key={`tp-wallet-${index}`}
                              variant="subtitle2"
                            >
                              wallet adress
                            </Typography>
                          </Stack>
                          <Typography
                            key={`tp-amount-${index}`}
                            variant="subtitle2"
                          >
                            {`${fCurrency(donate.crypto.amount)} (${
                              donate.crypto.count
                            } ${donate.crypto.type})`}
                          </Typography>
                        </Stack>
                      </CardContent>
                    </OutlineCard>
                  ))}
                </Stack>
              </CardContent>
            </Scrollbar>
          )}
        </OutlineCard>
      </Box>
      <FundraiseShareDialog post={post} open={open} onClose={handleClose} />
      <DonateDialog
        post={post}
        open={donateDlgOpen}
        onClose={handleDonateDlgClose}
      />
    </>
  );
}
