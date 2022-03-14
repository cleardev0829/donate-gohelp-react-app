import { useRef } from "react";
import { useDispatch, useSelector } from "../../../redux/store";
import { Icon } from "@iconify/react";
import attach2Fill from "@iconify/icons-eva/attach-2-fill";
import roundAddPhotoAlternate from "@iconify/icons-ic/round-add-photo-alternate";
import {
  experimentalStyled as styled,
  useTheme,
} from "@material-ui/core/styles";
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
  Divider,
  Slider,
} from "@material-ui/core";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import { PATH_DASHBOARD, PATH_PAGE } from "../../../routes/paths";
import {
  varFadeIn,
  varFadeInUp,
  varWrapEnter,
  varFadeInRight,
} from "../../animate";
import { ProgressItem } from "../landing/TopFundraiserCard";
import {
  getCart,
  createBilling,
  onNextStep,
  onBackStep,
  onGotoStep,
} from "src/redux/slices/donate";
// import Slider from "src/theme/overrides/Slider";
// ----------------------------------------------------------------------

const marks = [
  {
    value: 0,
    label: "0%",
  },

  {
    value: 100,
    label: "100%",
  },
];

export default function DonateToken() {
  const theme = useTheme();
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { checkout } = useSelector((state) => state.donate);
  const { cart, billing, activeStep } = checkout;

  const handleChangeToken = (value) => {};

  function valuetext(value) {
    return `0 Token ${value}%`;
  }

  return (
    <Box sx={{ py: 3 }}>
      <Box sx={{ textAlign: "right" }}>
        <Typography variant="body2">
          By continuing, you agree to the GoFundMe terms and privacy policy.
        </Typography>
      </Box>

      <Card sx={{ p: theme.shape.CARD_PADDING }}>
        <Stack spacing={theme.shape.MAIN_VERTICAL_SPACING}>
          <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
            <Typography variant="h4">Enter your donation</Typography>
            <TextField
              fullWidth
              size="small"
              label="Enter number of token"
              // {...getFieldProps("title")}
              // error={Boolean(touched.title && errors.title)}
              // helperText={touched.title && errors.title}
            />
          </Stack>

          <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
            <Typography variant="h7" sx={{ display: "block" }}>
              Tip GoHelp Services
            </Typography>
            <Typography variant="h7" sx={{ display: "block" }}>
              GoHelp has a 0% platform fee for organizers. GoFundMe will
              continue offering its services thanks to donors who will leave an
              optional amount here:
            </Typography>
          </Stack>

          {activeStep === 0 && (
            <Slider
              marks={marks}
              min={1}
              step={10}
              max={100}
              defaultValue={30}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              onChange={handleChangeToken}
            />
          )}

          {activeStep === 1 && (
            <TextField
              fullWidth
              size="small"
              label="Enter Tip amount"
              // {...getFieldProps("title")}
              // error={Boolean(touched.title && errors.title)}
              // helperText={touched.title && errors.title}
            />
          )}

          <Link variant="body2" underline="always">
            Enter custom tip
          </Link>

          <Box
            sx={{
              borderColor: "background.primary",
              border: "solid 1px",
              borderRadius: 1,
              p: 2,
            }}
          >
            <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h7">Top donation</Typography>
                <Typography gutterBottom variant="p1">
                  0.00 Token
                </Typography>
              </Stack>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h7">GoHelp tip</Typography>
                <Typography gutterBottom variant="p1">
                  0.00 Token
                </Typography>
              </Stack>

              <Divider flexItem />

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h7">Total due 0.00 token</Typography>
                <Typography gutterBottom variant="p1">
                  0.00 Token
                </Typography>
              </Stack>
            </Stack>
          </Box>

          <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
            <Typography variant="h4">Leave a message</Typography>
            <TextField
              fullWidth
              size="small"
              label="Enter your message"
              // {...getFieldProps("title")}
              // error={Boolean(touched.title && errors.title)}
              // helperText={touched.title && errors.title}
            />
          </Stack>
        </Stack>
      </Card>
    </Box>
  );
}
