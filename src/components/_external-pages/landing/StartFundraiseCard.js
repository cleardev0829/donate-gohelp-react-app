import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { paramCase } from "change-case";
import eyeFill from "@iconify/icons-eva/eye-fill";
import { Link as RouterLink } from "react-router-dom";
import shareFill from "@iconify/icons-eva/share-fill";
import messageCircleFill from "@iconify/icons-eva/message-circle-fill";
import { fPercent, fCurrency } from "../../../utils/formatNumber";
// material
import { alpha, experimentalStyled as styled } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Link,
  Card,
  Grid,
  Stack,
  Avatar,
  Typography,
  CardContent,
} from "@material-ui/core";
import { MLinearProgress } from "../../@material-extend";
// routes
import { PATH_DASHBOARD, PATH_PAGE } from "../../../routes/paths";
// utils
import { fDate } from "../../../utils/formatTime";
import { fShortenNumber } from "../../../utils/formatNumber";
//
import SvgIconStyle from "../../SvgIconStyle";
import {
  varFadeIn,
  varFadeInUp,
  varWrapEnter,
  varFadeInRight,
} from "../../animate";

// ----------------------------------------------------------------------

const CardMediaStyle = styled("div")({
  position: "relative",
  paddingTop: "calc(100% * 3 / 4)",
});

const TitleStyle = styled(Link)({
  height: 64,
  overflow: "hidden",
  WebkitLineClamp: 2,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
});

const CoverImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  // objectFit: "contain",
  objectFit: "cover",
  position: "absolute",
});

// ----------------------------------------------------------------------
const COLORS = ["primary", "info", "warning"];
ProgressItem.propTypes = {
  progress: PropTypes.object,
  index: PropTypes.number,
};

function ProgressItem({ progress, index }) {
  return (
    <Stack spacing={0}>
      <Stack direction="row" justifyContent="space-between" sx={{ width: 1 }}>
        <Typography
          gutterBottom
          variant="h7"
          color="primary"
          sx={{ display: "block" }}
        >
          Last donation 3 min ago
        </Typography>
        <Typography gutterBottom variant="h7" sx={{ display: "block" }}>
          78%
        </Typography>
      </Stack>

      <MLinearProgress
        variant="determinate"
        value={progress.value}
        color={COLORS[index]}
      />
    </Stack>
  );
}

StartFundraiseCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function StartFundraiseCard({ post, index }) {
  const { cover, title } = post;
  const linkTo = `${PATH_DASHBOARD.blog.root}/post/${paramCase(title)}`;
  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;

  return (
    <Grid
      item
      xs={12}
      sm={latestPostLarge ? 6 : 6}
      md={latestPostLarge ? 4 : 4}
    >
      <Card sx={{ position: "relative" }}>
        <CardMediaStyle>
          <CoverImgStyle alt={title} src={cover} />
        </CardMediaStyle>

        <CardContent>
          <TitleStyle
            // to={linkTo}
            color="inherit"
            variant="h4"
            // component={RouterLink}
            sx={{
              ...(latestPostLarge && { typography: "h4", height: 60 }),
              ...((latestPostLarge || latestPost) &&
                {
                  // color: "common.white",
                }),
            }}
            onClick={() => {
              // window.open(pdfUrl, "_blank");
            }}
          >
            {title}
          </TitleStyle>
        </CardContent>
      </Card>
    </Grid>
  );
}
