import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { paramCase } from "change-case";
import roundThumbUp from "@iconify/icons-ic/round-thumb-up";
import roundVerified from "@iconify/icons-ic/round-verified";
import checkmarkFill from "@iconify/icons-eva/checkmark-fill";
import shareFill from "@iconify/icons-eva/share-fill";
import eyeFill from "@iconify/icons-eva/eye-fill";
// material
import _ from "lodash";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import moment from "moment";
import {
  alpha,
  makeStyles,
  experimentalStyled as styled,
  useTheme,
} from "@material-ui/core/styles";
import {
  Box,
  Link,
  Card,
  Grid,
  Stack,
  Avatar,
  Button,
  Divider,
  Typography,
  CardContent,
} from "@material-ui/core";
import { PATH_DASHBOARD, PATH_PAGE } from "../../../routes/paths";
import { useDispatch, useSelector } from "../../../redux/store";
import { fDate } from "../../../utils/formatTime";
import { fShortenNumber } from "../../../utils/formatNumber";
import SvgIconStyle from "../../SvgIconStyle";
import {
  varFadeIn,
  varFadeInUp,
  varWrapEnter,
  varFadeInRight,
} from "../../animate";
import DonateProgress from "../../DonateProgress";
import { fNumber, fCurrency, fPercent } from "../../../utils/formatNumber";
import { filters } from "../../../utils/constants";
import { useEffect, useState } from "react";
import { getDonate, getDonatesById } from "src/redux/slices/donate";
import ReactQuill from "react-quill";
import ReactCountryFlag from "react-country-flag";
import MoreMenu from "./MoreMenu";
import FundraiseShareDialog from "../fundraise/FundraiseShareDialog";

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    boxShadow: theme.customShadows.z16,
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    zIndex: 0, // Fix Safari overflow: hidden with border radius

    "&:hover": {
      backgroundColor: theme.palette.background.paper,
    },
  },
}));

export const CardMediaStyle = styled("div")({
  position: "relative",
  paddingTop: "calc(100% * 3 / 4)",
  // overflow: "hidden",
});

export const CoverImgStyle = styled("img")(({ sx }) => ({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
  borderRadius: "0.25rem",
  ...sx,
}));

export const TitleStyle = styled(Typography)({
  overflow: "hidden",
  WebkitLineClamp: 1,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
});

export const DescriptionStyle = styled(Typography)({
  height: 70,
  overflow: "hidden",
  WebkitLineClamp: 3,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
});

export const ConnectTextStyle = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  transition: theme.transitions.create("opacity", {
    duration: theme.transitions.duration.shortest,
  }),
  cursor: "pointer",
  "&:hover": {
    opacity: 0.48,
    textDecoration: "none",
  },
}));

const PublishButtonStyle = styled(Box)(({ theme }) => ({
  zIndex: 9,
  position: "absolute",
  left: theme.spacing(2),
  bottom: theme.spacing(2),
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  backgroundColor: theme.palette.primary.main,
  borderRadius: 8,
  padding: theme.spacing(0.75, 2),
}));

// ----------------------------------------------------------------------

TopFundraiserCard.propTypes = {
  post: PropTypes.object.isRequired,
  simple: PropTypes.bool,
};

export default function TopFundraiserCard({ post, simple = false }) {
  const theme = useTheme();
  const classes = useStyles();
  const navigate = useNavigate();
  const filter = filters(post.donates);
  const status = post.isDeleted ? "Deleted" : "Published";
  const [open, setOpen] = useState(false);
  const [visibility, setVisivility] = useState("none");

  const handleNavigate = () => {
    simple
      ? navigate(`${PATH_PAGE.fundraiseDetails}/${post.id}`)
      : navigate(`${PATH_PAGE.donate}/${post.id}`);
  };

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const handleMouseOver = () => {
    setVisivility("visivility");
  };

  const handleMouseOut = () => {
    setVisivility("none");
  };

  return (
    <>
      <Grid item xs={12} sm={6} md={3}>
        <Card
          class={classes.root}
          sx={{ position: "relative" }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <CardContent>
            <Box sx={{ cursor: "pointer" }} onClick={handleNavigate}>
              <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
                <CardMediaStyle>
                  {simple && <PublishButtonStyle>{status}</PublishButtonStyle>}

                  <CoverImgStyle
                    alt={"cover"}
                    src={post.cover.preview}
                    sx={{
                      transform: `rotate(${
                        ((-1 * post.rotate) % 4) * 90
                      }deg) scale(${1 + post.scale / 100})`,
                    }}
                  />
                </CardMediaStyle>

                <TitleStyle color="inherit" variant="subtitle1">
                  {post.title}
                </TitleStyle>

                <ReactCountryFlag
                  countryCode={post.live.code}
                  svg
                  style={{
                    margin: 0,
                    marginRight: 0,
                  }}
                />

                <DonateProgress
                  time={filter.recentTimeAgo}
                  total={filter.totalAmount}
                  goal={post.goal}
                />
              </Stack>
            </Box>

            <Divider sx={{ mt: theme.shape.MAIN_VERTICAL_SPACING, mb: 1 }} />

            <Stack
              direction="row"
              alignItems="center"
              justifyContent={"space-between"}
              sx={{ paddingBottom: 0.8 }}
            >
              <Box>
                <ConnectTextStyle
                  variant="subtitle2"
                  color="primary"
                  sx={{ display: visibility }}
                >
                  Connect
                </ConnectTextStyle>
              </Box>
              <MoreMenu
                uid={post.id}
                onOpenShareDialog={handleOpenPreview}
                name={"name"}
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <FundraiseShareDialog
        uid={post.id}
        title={post.title}
        openPreview={open}
        onClosePreview={handleClosePreview}
      />
    </>
  );
}
