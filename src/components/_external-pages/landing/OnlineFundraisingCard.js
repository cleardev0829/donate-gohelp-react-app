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

const CardStyle = styled("div")(({ theme }) => ({
  height: 350,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "column",
  textAlign: "center",
  border: "1px solid #DADADA",
  borderRadius: "12px",
  padding: theme.spacing(5),
}));

const CardContentStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "column",
  textAlign: "center",
  height: "50%",
}));

const CardMediaStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  padding: theme.spacing(1.5),
  backgroundColor: theme.palette.background.neutral,
  borderRadius: 50,
}));

const TitleStyle = styled(Link)({
  // height: 54,
  // overflow: "hidden",
  // WebkitLineClamp: 2,
  // display: "-webkit-box",
  // WebkitBoxOrient: "vertical",
});

const CoverImgStyle = styled("img")({
  width: 60,
  height: 60,
});

// ----------------------------------------------------------------------

OnlineFundraisingCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function OnlineFundraisingCard({ post, index }) {
  const { cover, title, view, comment, share, description, link } = post;
  const linkTo = `${PATH_DASHBOARD.blog.root}/post/${paramCase(title)}`;
  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;

  const POST_INFO = [
    { number: comment, icon: messageCircleFill },
    { number: view, icon: eyeFill },
    { number: share, icon: shareFill },
  ];

  return (
    <Grid
      item
      xs={12}
      sm={latestPostLarge ? 6 : 6}
      md={latestPostLarge ? 4 : 4}
    >
      <CardStyle sx={{ position: "relative" }}>
        <CardMediaStyle>
          <CoverImgStyle alt={title} src={cover} />
        </CardMediaStyle>

        <CardContentStyle>
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

          <Typography gutterBottom variant="p1" sx={{ display: "block" }}>
            {description}
          </Typography>

          {link && (
            <Link variant="body1" underline="always">
              {link}
            </Link>
          )}
        </CardContentStyle>
      </CardStyle>
    </Grid>
  );
}
