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
  Typography,
  Divider,
} from "@material-ui/core";
// utils
import { fNumber } from "../../../utils/formatNumber";
import { experimentalStyled as styled } from "@material-ui/core/styles";
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

DonateProfile.propTypes = {
  profile: PropTypes.object,
};

export default function DonateProfile({ props }) {
  const dispatch = useDispatch();
  const { checkout } = useSelector((state) => state.donate);
  const { cart, billing, activeStep } = checkout;
  const { follower, following } = props;

  return (
    <Box sx={{ py: 3 }}>
      <Stack spacing={2}>
        <Typography variant="h4">
          Share Support Laura swans wish to live longer
        </Typography>

        <Box sx={{ position: "relative" }}>
          <CardMediaStyle>
            <CoverImgStyle alt={"title"} src={IMG(1)} />
          </CardMediaStyle>
        </Box>

        <Typography variant="body2">
          ***Angela Yujin Lee on behalf of The Lee Family is organizing this
          fundraiser.
        </Typography>

        <Stack direction="row" spacing={1}>
          <motion.div variants={varFadeInRight}>
            <Button
              size="large"
              variant="outlined"
              component={RouterLink}
              to={PATH_PAGE.page404}
            >
              Created 2 days ago
            </Button>
          </motion.div>
          <motion.div variants={varFadeInRight}>
            <Button
              size="large"
              variant="outlined"
              component={RouterLink}
              to={PATH_PAGE.page404}
            >
              Funerals & Memorials
            </Button>
          </motion.div>
        </Stack>

        <Box>
          <Stack>
            <Card
              sx={{
                backgroundColor: "background.default",
                borderColor: "background.primary",
                border: "solid 1px",
              }}
            >
              <CardHeader title="A few words from Angela Yujin Lee" />

              <Stack spacing={2} sx={{ p: 3 }}>
                <Typography variant="body2">
                  Thank you so much for your generous contributions. Thanks to
                  you, we have surpassed our initial goal in less than 24 hours.
                  We are setting a new goal of $300,000 to establish the
                  Christina Yuna Lee Memorial Fund, to support these
                  organizations and others in the future. ***THANK YOU*** On
                  February 13, 2022, our daughter, sister, and friend Christina
                  Yuna Lee was taken from us in a senseless act of violence.
                  Christina was coming home from a night out with her friends.
                  She walked up the stairs to her apartment and was fatally met
                  by a man with ill intent. Her death is part of an alarming
                  pattern of unchecked, hateful violence against women, namely
                  women of Asian descent and women of color that can no longer
                  stand without consequence. Thank you, Christina's family and
                  friends
                </Typography>
              </Stack>
            </Card>
          </Stack>
        </Box>

        <Stack direction="row" justifyContent="space-between" spacing={1}>
          <Grid container spacing={2}>
            <Grid item xs="12" md="6">
              <motion.div variants={varFadeInRight}>
                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  // component={RouterLink}
                  // to={PATH_PAGE.donate_payment}
                  onClick={() => dispatch(onNextStep())}
                >
                  Donate Now
                </Button>
              </motion.div>
            </Grid>
            <Grid item xs="12" md="6">
              <motion.div variants={varFadeInRight}>
                <Button
                  fullWidth
                  size="large"
                  variant="outlined"
                  component={RouterLink}
                  to={PATH_PAGE.page404}
                >
                  Share
                </Button>
              </motion.div>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Box>
  );
}
