import PropTypes from "prop-types";
import {
  experimentalStyled as styled,
  makeStyles,
} from "@material-ui/core/styles";
import { Card } from "@material-ui/core";

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    // boxShadow: theme.customShadows.z16,
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    zIndex: 0, // Fix Safari overflow: hidden with border radius
  },
}));

// ----------------------------------------------------------------------

OutlineCard.propTypes = {
  children: PropTypes.node,
};

export default function OutlineCard({ children }) {
  const classes = useStyles();

  return <Card class={classes.root}>{children}</Card>;
}
