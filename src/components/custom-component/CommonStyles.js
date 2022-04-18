import _ from "lodash";
import {
  alpha,
  useTheme,
  makeStyles,
  experimentalStyled as styled,
} from "@material-ui/core/styles";
import { Link, Button, Typography } from "@material-ui/core";

// ----------------------------------------------------------------------

export const CardMediaStyle = styled("div")({
  position: "relative",
  paddingTop: "calc(100% * 3 / 4)",
  overflow: "hidden",
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

export const DescriptionStyle = styled(Typography)(({ theme }) => ({
  height: 70,
  overflow: "hidden",
  WebkitLineClamp: 3,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  color: theme.palette.text.disabled,
}));

export const OneLineTextStyle = styled(Typography)({
  overflow: "hidden",
  WebkitLineClamp: 1,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
});

export const HoverTextStyle = styled(Link)(({ theme }) => ({
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
