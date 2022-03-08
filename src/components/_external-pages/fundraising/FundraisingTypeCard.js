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
  backgroundColor: theme.palette.background.paper,
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

FundraisingTypeCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
  onClick: PropTypes.node,
  type: PropTypes.number,
};

export default function FundraisingTypeCard({ post, index, type, onClick }) {
  const { cover, title, view, comment, share, description } = post;

  return (
    <Grid item xs={12} sm={6} md={6}>
      <CardStyle
        sx={{
          position: "relative",
          backgroundColor: (theme) =>
            type === index ? theme.palette.primary.main : "",
          borderColor: (theme) =>
            type === index ? theme.palette.primary.main : "",
        }}
        onClick={() => onClick(index)}
      >
        <CardMediaStyle
          sx={{
            backgroundColor: (theme) =>
              type === index ? theme.palette.common.white : "",
          }}
        >
          <CoverImgStyle alt={title} src={cover} />
        </CardMediaStyle>

        <CardContentStyle>
          <TitleStyle
            color="inherit"
            variant="h4"
            sx={{
              typography: "h4",
              height: 60,
              // color: "common.white",
            }}
          >
            {title}
          </TitleStyle>

          <Typography gutterBottom variant="p1" sx={{ display: "block" }}>
            {description}
          </Typography>
        </CardContentStyle>
      </CardStyle>
    </Grid>
  );
}
