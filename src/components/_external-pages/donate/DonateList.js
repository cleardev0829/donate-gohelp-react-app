import { useDispatch, useSelector } from "../../../redux/store";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import pinFill from "@iconify/icons-eva/pin-fill";
import emailFill from "@iconify/icons-eva/email-fill";
import roundBusinessCenter from "@iconify/icons-ic/round-business-center";
// material
import {
  experimentalStyled as styled,
  useTheme,
} from "@material-ui/core/styles";
import {
  Box,
  Link,
  Card,
  Grid,
  Avatar,
  Button,
  Typography,
  CardHeader,
  Stack,
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
import { IconBullet } from "src/layouts/dashboard/MenuDesktop";
import {
  getCart,
  createBilling,
  onNextStep,
  onBackStep,
  onGotoStep,
} from "src/redux/slices/donate";

// ----------------------------------------------------------------------

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

const supports = [...Array(5)].map((_, index) => ({
  id: index,
  avatar: "/static/avatars/avatar_man.png",
  title: "Emily Taing donated 100Token",
  description:
    "I am just a stranger but I think of Christina often. I live a few blocks away in Lower Manhattan and as an Asian American woman, also in the creative field, I see myself in her. May she rest peacefully knowing her legacy will live on... inspiring others to give & love as fiercely as she did.",
  time: index + 1,
}));

DonateList.propTypes = {
  post: PropTypes.object,
};

export default function DonateList({ post }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { checkout } = useSelector((state) => state.donate);
  const { cart, billing, activeStep } = checkout;
  const { quote, country, email, role, company, school } = post;

  return (
    <Box>
      <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
        <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
          <Card
            sx={{
              backgroundColor: "background.body",
              border: "1px solid #F3F3F3",
              p: (theme) => theme.shape.CARD_PADDING,
            }}
          >
            <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
              <Typography variant="h4">Words of support (99)</Typography>

              {supports.map((support, index) => (
                <Stack
                  direction="row"
                  spacing={theme.shape.CARD_CONTENT_SPACING}
                >
                  <Avatar
                    key={support.id}
                    alt={support.id}
                    src={support.avatar}
                  />
                  <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={theme.shape.MAIN_HORIZONTAL_SPACING}
                    >
                      <Link variant="h4" sx={{ color: "text.primary" }}>
                        {support.title}
                      </Link>
                      <Stack direction="row" alignItems="center">
                        <IconBullet />
                        <Typography
                          component="span"
                          variant="p1"
                          color="text.primary"
                        >
                          {`${support.time} hr ago`}
                        </Typography>
                      </Stack>
                    </Stack>

                    <Typography
                      component="span"
                      variant="p1"
                      color="text.primary"
                    >
                      {support.description}
                    </Typography>

                    {index === supports.length - 1 && (
                      <motion.div variants={varFadeInRight}>
                        <Button
                          variant="outlined"
                          component={RouterLink}
                          to={PATH_PAGE.page404}
                        >
                          Show more
                        </Button>
                      </motion.div>
                    )}
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </Card>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Grid container spacing={theme.shape.MAIN_HORIZONTAL_SPACING}>
            <Grid item xs="12" md="6">
              <motion.div variants={varFadeInRight}>
                <Typography component="span" variant="h7">
                  Please donate to share words of encouragement.
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs="12" md="6">
              <motion.div variants={varFadeInRight}>
                <Button
                  fullWidth
                  variant="outlined"
                  // component={RouterLink}
                  // to={PATH_PAGE.donate_payment}
                  onClick={() => dispatch(onNextStep())}
                >
                  Donate Now
                </Button>
              </motion.div>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Box>
  );
}
