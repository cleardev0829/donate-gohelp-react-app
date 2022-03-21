import PropTypes from "prop-types";
import { useDispatch, useSelector } from "../../../redux/store";
import { Icon } from "@iconify/react";
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
import { onNextStep } from "src/redux/slices/donate";
import { CardMediaStyle, CoverImgStyle } from "../landing/TopFundraiserCard";

// ----------------------------------------------------------------------

DonateProfile.propTypes = {
  post: PropTypes.object,
};

export default function DonateProfile({ post }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { checkout } = useSelector((state) => state.donate);

  const { id, coverUrl, title, description, donates } = post;

  return (
    <Box sx={{ py: 3 }}>
      <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
        <Typography variant="h3">{title}</Typography>

        <Box sx={{ position: "relative" }}>
          <CardMediaStyle>
            <CoverImgStyle alt="cover" src={coverUrl} />
          </CardMediaStyle>
        </Box>

        <Typography variant="body2">{description}</Typography>

        <Stack direction="row" spacing={theme.shape.CARD_CONTENT_SPACING}>
          <motion.div variants={varFadeInRight}>
            <Button
              variant="outlined"
              color="inherit"
              // component={RouterLink}
              // to={PATH_PAGE.page404}
              startIcon={<Icon icon="iconoir:timer" />}
            >
              Created 2 days ago
            </Button>
          </motion.div>
          <motion.div variants={varFadeInRight}>
            <Button
              variant="outlined"
              color="inherit"
              // component={RouterLink}
              // to={PATH_PAGE.page404}
              startIcon={<Icon icon="akar-icons:ribbon" />}
            >
              Funerals & Memorials
            </Button>
          </motion.div>
        </Stack>

        <Box>
          <Stack>
            <Card
              sx={{
                backgroundColor: "background.body",
                border: "1px solid #F3F3F3",
                p: (theme) => theme.shape.CARD_PADDING,
              }}
            >
              <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
                <Typography variant="h4">
                  A few words from Angela Yujin Lee
                </Typography>

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

        <Stack
          direction="row"
          justifyContent="space-between"
          spacing={theme.shape.CARD_CONTENT_SPACING}
        >
          <Grid container spacing={theme.shape.CARD_CONTENT_SPACING}>
            <Grid item xs="12" md="6">
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
            </Grid>
            <Grid item xs="12" md="6">
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
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Box>
  );
}
