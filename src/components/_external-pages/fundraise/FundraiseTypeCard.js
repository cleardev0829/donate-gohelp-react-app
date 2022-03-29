import PropTypes from "prop-types";
import {
  experimentalStyled as styled,
  useTheme,
} from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import RoundedImg from "../../RoundedImg";
import { TitleStyle, DescriptionStyle } from "../landing/TopFundraiserCard";
import { CardStyle, CardContentStyle } from "../landing/OnlineFundraiseCard";

FundraiseTypeCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
  type: PropTypes.number,
  onClick: PropTypes.func,
};

export default function FundraiseTypeCard({ post, index, type, onClick }) {
  const { cover, title, description } = post;
  const theme = useTheme();

  return (
    <Grid item xs={12} sm={6} md={6}>
      <CardStyle
        sx={{
          position: "relative",
          backgroundColor: (theme) =>
            type === index ? theme.palette.primary.main : "",
          borderColor: (theme) =>
            type === index ? theme.palette.primary.main : "",
        }}
        onClick={() => onClick(index)}
      >
        <RoundedImg
          alt={title}
          src={cover}
          color={type === index ? theme.palette.common.white : ""}
        />

        <CardContentStyle>
          <TitleStyle color="inherit" variant="h5" sx={{ height: 64 }}>
            {title}
          </TitleStyle>

          <DescriptionStyle color="inherit" variant="subtitle1">
            {description}
          </DescriptionStyle>
        </CardContentStyle>
      </CardStyle>
    </Grid>
  );
}
