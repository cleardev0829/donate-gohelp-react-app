import PropTypes from "prop-types";
import { MLinearProgress } from "./@material-extend";
import { Stack, Typography } from "@material-ui/core";

const COLORS = ["primary", "info", "warning"];

ProgressItem.propTypes = {
  progress: PropTypes.number,
};

export default function ProgressItem({ progress }) {
  return (
    <Stack>
      <MLinearProgress
        variant="determinate"
        value={progress}
        color={COLORS[0]}
      />
    </Stack>
  );
}
