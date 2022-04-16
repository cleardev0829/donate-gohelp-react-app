import numeral from "numeral";
import PropTypes from "prop-types";
import { Stack, Typography, useTheme } from "@material-ui/core";
import { alpha, experimentalStyled as styled } from "@material-ui/core/styles";
import ProgressItem from "./ProgressItem";
import { OneLineTextStyle } from "./CommonStyles";
import { fPercent, fCurrency } from "src/utils/formatNumber";

DonateProgress.propTypes = {
  time: PropTypes.string,
  total: PropTypes.number,
  goal: PropTypes.number,
};

export default function DonateProgress({ time, total, goal }) {
  const theme = useTheme();

  return (
    <Stack spacing={0.5}>
      <Stack
        spacing={theme.shape.CARD_MARGIN}
        direction="row"
        justifyContent="space-between"
      >
        <OneLineTextStyle variant="h6" color="primary">
          {`Last donation ${time}`}
        </OneLineTextStyle>
        <Typography variant="h6" color="primary">
          {fPercent((total * 100) / goal)}
        </Typography>
      </Stack>

      <ProgressItem
        text={`Last donation ${time}`}
        progress={parseFloat(fPercent((total * 100) / goal))}
      />
      <OneLineTextStyle variant="h6" color="primary">
        {`${fCurrency(total)} raised of ${fCurrency(goal)}`}
      </OneLineTextStyle>
    </Stack>
  );
}
