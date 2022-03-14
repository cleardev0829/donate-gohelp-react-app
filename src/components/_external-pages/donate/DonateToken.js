import { useRef } from "react";
import { useDispatch, useSelector } from "../../../redux/store";
import { Icon } from "@iconify/react";
import attach2Fill from "@iconify/icons-eva/attach-2-fill";
import roundAddPhotoAlternate from "@iconify/icons-ic/round-add-photo-alternate";
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
// ----------------------------------------------------------------------

export default function DonateToken() {
  const theme = useTheme();
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { checkout } = useSelector((state) => state.donate);
  const { cart, billing, activeStep } = checkout;

  const handleAttach = () => {
    fileInputRef.current.click();
  };

  return (
    <Box sx={{ py: 3 }}>
      <Card sx={{ p: theme.shape.CARD_PADDING }}>
        <Stack spacing={theme.shape.MAIN_VERTICAL_SPACING}>
          <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
            <ProgressItem
              key={" Last donation 3 min ago"}
              progress={{ value: 78 }}
              index={0}
            />
            <Typography gutterBottom variant="h6" sx={{ display: "block" }}>
              7,800 token raised of 10,000 Token
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
                5350 Token
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
                550 Token
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
                50 Token
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
                  Tom smith
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
                component={RouterLink}
                to={PATH_PAGE.page404}
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
