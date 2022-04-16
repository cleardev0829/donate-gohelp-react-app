import PropTypes from "prop-types";
import {
  makeStyles,
  experimentalStyled as styled,
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
  sx: PropTypes.object,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default function OutlineCard({ sx, onClick, children }) {
  const classes = useStyles();

  return (
    <Card sx={sx} className={classes.root} onClick={onClick}>
      {children}
    </Card>
  );
}
