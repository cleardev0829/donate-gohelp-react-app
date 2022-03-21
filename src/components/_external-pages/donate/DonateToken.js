import { useRef } from "react";
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
import ProgressItem from "../../../components/ProgressItem";
import {
  getCart,
  createBilling,
  onNextStep,
  onBackStep,
  onGotoStep,
} from "src/redux/slices/donate";
import { fPercent } from "src/utils/formatNumber";
import { diff, filters } from "src/utils/constants";
// ----------------------------------------------------------------------

DonateToken.propTypes = {
  post: PropTypes.object,
};

export default function DonateToken({ post }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const filter = filters(post.donates);

  return (
    <Box sx={{ py: 3 }}>
      <Card sx={{ p: theme.shape.CARD_PADDING }}>
        <Stack spacing={theme.shape.MAIN_VERTICAL_SPACING}>
          <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
            <ProgressItem
              text={`Last donation ${filter.recentTimeAgo}`}
              progress={{
                value: fPercent(
                  (filter.totalAmount * 100) / parseFloat(post.goal)
                ),
              }}
            />
            <Typography gutterBottom variant="h6" sx={{ display: "block" }}>
              {`${filter.totalAmount} token raised of ${post.goal} Token`}
            </Typography>
          </Stack>

          <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack>
                <Typography variant="h7">Top donation</Typography>
                <Typography gutterBottom variant="p1">
                  Tom smith
                </Typography>
              </Stack>
              <Typography gutterBottom variant="p1">
                {filter.maxAmount}
              </Typography>
            </Stack>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack>
                <Typography variant="h7">Recent donation</Typography>
                <Typography gutterBottom variant="p1">
                  Tom smith
                </Typography>
              </Stack>
              <Typography gutterBottom variant="p1">
                {filter.recentAmount}
              </Typography>
            </Stack>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack>
                <Typography variant="h7">First donation</Typography>
                <Typography gutterBottom variant="p1">
                  Tom smith
                </Typography>
              </Stack>
              <Typography gutterBottom variant="p1">
                {filter.firstAmount}
              </Typography>
            </Stack>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack>
                <Typography variant="h7">Total donation</Typography>
                <Typography gutterBottom variant="p1">
                  {`${filter.count} people donated`}
                </Typography>
              </Stack>
              <Link variant="body2" underline="always">
                See All
              </Link>
            </Stack>
          </Stack>

          <Stack spacing={2}>
            <motion.div variants={varFadeInRight}>
              <Button
                fullWidth
                variant="outlined"
                // component={RouterLink}
                // to={PATH_PAGE.page404}
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
  );
}
