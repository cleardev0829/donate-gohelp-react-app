import { useRef, useState } from "react";
import { useDispatch, useSelector } from "../../../redux/store";
import PropTypes from "prop-types";
// material
import {
  Box,
  Link,
  Card,
  CardContent,
  Stack,
  Button,
  TextField,
  IconButton,
  Typography,
} from "@material-ui/core";
import {
  experimentalStyled as styled,
  useTheme,
} from "@material-ui/core/styles";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import { PATH_DASHBOARD, PATH_PAGE } from "../../../routes/paths";
import {
  varFadeIn,
  varFadeInUp,
  varWrapEnter,
  varFadeInRight,
} from "../../animate";
import DonateProgress from "../../../components/DonateProgress";
import { onNextStep } from "src/redux/slices/donate";
import { fCurrency, fPercent } from "src/utils/formatNumber";
import { filters } from "src/utils/constants";
import FundraiseShareDialog from "../fundraise/FundraiseShareDialog";
// ----------------------------------------------------------------------

DonateToken.propTypes = {
  post: PropTypes.object,
};

export default function DonateToken({ post }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const filter = filters(post.donates);
  const [isHidden, setHidden] = useState(true);
  const [open, setOpen] = useState(false);

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const handleShare = () => {
    handleOpenPreview();
  };

  return (
    <>
      <Box sx={{ py: 3 }}>
        <Card sx={{ p: theme.shape.CARD_PADDING }}>
          <Stack spacing={theme.shape.MAIN_VERTICAL_SPACING}>
            <DonateProgress
              time={filter.recentTimeAgo}
              total={filter.totalAmount}
              goal={post.goal}
            />

            <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack>
                  <Typography variant="h7">Top donation</Typography>
                  <Typography gutterBottom variant="subtitle1">
                    address
                  </Typography>
                </Stack>
                <Typography gutterBottom variant="subtitle1">
                  {`${fCurrency(filter.maxAmount)}`}
                </Typography>
              </Stack>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack>
                  <Typography variant="h7">Recent donation</Typography>
                  <Typography gutterBottom variant="subtitle1">
                    address
                  </Typography>
                </Stack>
                <Typography gutterBottom variant="subtitle1">
                  {`${fCurrency(filter.recentAmount)}`}
                </Typography>
              </Stack>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack>
                  <Typography variant="h7">First donation</Typography>
                  <Typography gutterBottom variant="subtitle1">
                    address
                  </Typography>
                </Stack>
                <Typography gutterBottom variant="subtitle1">
                  {`${fCurrency(filter.firstAmount)}`}
                </Typography>
              </Stack>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack>
                  <Typography variant="h7">Total donation</Typography>
                  <Typography gutterBottom variant="subtitle1">
                    {`${filter.count} people donated`}
                  </Typography>
                </Stack>
                {isHidden && (
                  <Link
                    variant="body2"
                    underline="always"
                    sx={{ cursor: "pointer" }}
                    onClick={() => setHidden(!isHidden)}
                  >
                    See All
                  </Link>
                )}
              </Stack>

              {!isHidden && (
                <Stack spacing={1}>
                  {post.donates.map((donate, index) => (
                    <Stack
                      key={`up-stack-${index}`}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Stack key={`down-stack-${index}`}>
                        <Typography
                          key={`tp-wallet-${index}`}
                          gutterBottom
                          variant="subtitle1"
                        >
                          wallet adress
                        </Typography>
                      </Stack>
                      <Typography
                        key={`tp-amount-${index}`}
                        gutterBottom
                        variant="subtitle1"
                      >
                        {`${fCurrency(donate.crypto.amount)} (${
                          donate.crypto.count
                        } ${donate.crypto.type})`}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              )}
            </Stack>

            <Stack spacing={2}>
              <motion.div variants={varFadeInRight}>
                <Button
                  fullWidth
                  variant="outlined"
                  // component={RouterLink}
                  // to={PATH_PAGE.page404}
                  onClick={handleShare}
                >
                  Share
                </Button>
              </motion.div>
              <motion.div variants={varFadeInRight}>
                <Button
                  fullWidth
                  variant="contained"
                  // component={RouterLink}
                  // to={PATH_PAGE.donate_payment}
                  onClick={() => dispatch(onNextStep())}
                >
                  Donate Now
                </Button>
              </motion.div>
            </Stack>
          </Stack>
        </Card>
      </Box>
      <FundraiseShareDialog
        uid={post.uid}
        title={post.title}
        openPreview={open}
        onClosePreview={handleClosePreview}
      />
    </>
  );
}
