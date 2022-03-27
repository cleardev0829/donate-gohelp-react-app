import PropTypes from "prop-types";
import { Stack, Typography, useTheme } from "@material-ui/core";
import { alpha, experimentalStyled as styled } from "@material-ui/core/styles";
import ProgressItem from "./ProgressItem";
import { fPercent, fCurrency } from "src/utils/formatNumber";

export const TextStyle = styled(Typography)({
  overflow: "hidden",
  WebkitLineClamp: 1,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
});

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
      <TextStyle variant="h6" color="inherit" sx={{ height: 30 }}>
        {`${fCurrency(total)} raised of ${fCurrency(goal)}`}
      </TextStyle>
    </Stack>
  );
}
