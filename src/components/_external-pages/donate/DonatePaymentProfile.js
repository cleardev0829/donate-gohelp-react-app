import PropTypes from "prop-types";
import { useDispatch, useSelector } from "../../../redux/store";
// material
import {
  Box,
  Card,
  CardHeader,
  Grid,
  Stack,
  Button,
  Divider,
  Typography,
  CardContent,
} from "@material-ui/core";
// utils
import { fNumber } from "../../../utils/formatNumber";
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
import { ProgressItem } from "../landing/TopFundraiserCard";
import {
  getCart,
  createBilling,
  onNextStep,
  onBackStep,
  onGotoStep,
} from "src/redux/slices/donate";
// ----------------------------------------------------------------------
const IMG = (index) => `/static/fundraisers/fundraiser_${index}.png`;

const CardMediaStyle = styled("div")({
  height: 100,
  position: "relative",
  paddingTop: "calc(100% * 3 / 4)",
});

const CoverImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "contain",
  // objectFit: "cover",
  position: "absolute",
});

const ImgStyle = styled("img")({
  // width: 40,
  height: 20,
  objectFit: "contain",
});

DonateProfile.propTypes = {
  profile: PropTypes.object,
};

export default function DonateProfile({ props }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { checkout } = useSelector((state) => state.donate);
  const { cart, billing, activeStep } = checkout;
  const { follower, following } = props;

  return (
    <Box sx={{ py: 3 }}>
      <Stack spacing={theme.shape.MAIN_VERTICAL_SPACING}>
        <Box sx={{ position: "relative" }}>
          <CardMediaStyle>
            <CoverImgStyle alt={"title"} src={IMG(1)} />
          </CardMediaStyle>
        </Box>

        <Typography variant="h4">
          You're supporting Christina Yuna Lee Memorial Fund
        </Typography>

        <Typography variant="body2">
          Your donation will benefit Angela Yujin Lee on behalf of The Lee
          Family
        </Typography>

        <Card sx={{ p: theme.shape.CARD_PADDING }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box maxWidth={125}>
              <Typography variant="h7">We protect your donation</Typography>
            </Box>
            <Divider orientation="vertical" flexItem />

            <ImgStyle
              src="/static/donate_protect/donate_protect_1.png"
              alt="1"
            />
            <ImgStyle
              src="/static/donate_protect/donate_protect_2.png"
              alt="2"
            />
            <ImgStyle
              src="/static/donate_protect/donate_protect_3.png"
              alt="3"
            />
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
}
