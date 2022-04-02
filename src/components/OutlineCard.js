import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    boxShadow: theme.customShadows.z16,
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    zIndex: 0, // Fix Safari overflow: hidden with border radius
  },
}));

// ----------------------------------------------------------------------

export default function OutlineCard({ children }) {
  const classes = useStyles();

  return <Card class={classes.root}>{children}</Card>;
}
