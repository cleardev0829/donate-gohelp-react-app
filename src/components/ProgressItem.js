import PropTypes from "prop-types";
import { MLinearProgress } from "./@material-extend";
import { Stack, Typography } from "@material-ui/core";

const COLORS = ["primary", "info", "warning"];

ProgressItem.propTypes = {
  key: PropTypes.string,
  text: PropTypes.string,
  progress: PropTypes.object,
  index: PropTypes.number,
};

export default function ProgressItem({ key, text, progress, index }) {
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
          {progress.value}
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
