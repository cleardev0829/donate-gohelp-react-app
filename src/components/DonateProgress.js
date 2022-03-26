import PropTypes from "prop-types";
import { Stack, Typography, useTheme } from "@material-ui/core";
import ProgressItem from "./ProgressItem";
import { fPercent, fCurrency } from "src/utils/formatNumber";

DonateProgress.propTypes = {
  time: PropTypes.string,
  total: PropTypes.number,
  goal: PropTypes.number,
};

export default function DonateProgress({ time, total, goal }) {
  const theme = useTheme();

  return (
    <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
      <ProgressItem
        text={`Last donation ${time}`}
        progress={fPercent((total * 100) / goal)}
      />
      <Typography gutterBottom variant="h6" sx={{ display: "block" }}>
        {`${fCurrency(total)} raised of ${fCurrency(goal)}`}
      </Typography>
    </Stack>
  );
}
