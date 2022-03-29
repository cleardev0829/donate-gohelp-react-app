import PropTypes from "prop-types";
import { MLinearProgress } from "./@material-extend";
import { Stack, Typography } from "@material-ui/core";

const COLORS = ["primary", "info", "warning"];

ProgressItem.propTypes = {
  text: PropTypes.string,
  progress: PropTypes.number,
};

export default function ProgressItem({ text, progress }) {
  return (
    <Stack spacing={0}>
      <Stack direction="row" justifyContent="space-between" sx={{ width: 1 }}>
        <Typography gutterBottom color="primary" sx={{ display: "block" }}>
          {text}
        </Typography>
        <Typography gutterBottom sx={{ display: "block" }}>
          {progress}
        </Typography>
      </Stack>

      <MLinearProgress
        variant="determinate"
        value={progress.substring(0, progress.length - 1)}
        color={COLORS[0]}
      />
    </Stack>
  );
}
