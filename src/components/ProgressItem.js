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
        <Typography
          gutterBottom
          variant="h7"
          color="primary"
          sx={{ display: "block" }}
        >
          {text}
        </Typography>
        <Typography gutterBottom variant="h7" sx={{ display: "block" }}>
          {progress}
        </Typography>
      </Stack>

      <MLinearProgress
        variant="determinate"
        value={progress}
        color={COLORS[0]}
      />
    </Stack>
  );
}
