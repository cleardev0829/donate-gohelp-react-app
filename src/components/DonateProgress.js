import PropTypes from "prop-types";
import { Stack, Typography, useTheme } from "@material-ui/core";
import { alpha, experimentalStyled as styled } from "@material-ui/core/styles";
import ProgressItem from "./ProgressItem";
import { fPercent, fCurrency } from "src/utils/formatNumber";

export const RecentTimeAgoTextStyle = styled(Typography)({
  overflow: "hidden",
  WebkitLineClamp: 1,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
});

export const DonationTextStyle = styled(Typography)({
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
    <Stack spacing={0.5}>
      <Stack direction="row" justifyContent="space-between">
        <RecentTimeAgoTextStyle variant="body2" color="primary">
          {`Last donation ${time}`}
        </RecentTimeAgoTextStyle>
        <Typography variant="subtitle2">
          {fPercent((total * 100) / goal)}
        </Typography>
      </Stack>

      <ProgressItem
        text={`Last donation ${time}`}
        progress={fPercent((total * 100) / goal)}
      />
      <DonationTextStyle variant="subtitle2" color="inherit">
        {`${fCurrency(total)} raised of ${fCurrency(goal)}`}
      </DonationTextStyle>
    </Stack>
  );
}
