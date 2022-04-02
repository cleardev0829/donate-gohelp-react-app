import PropTypes from "prop-types";
import {
  useTheme,
  experimentalStyled as styled,
} from "@material-ui/core/styles";
import { Grid, Stack, CardContent } from "@material-ui/core";
import RoundedImg from "../../RoundedImg";
import OutlineCard from "src/components/OutlineCard";
import { TitleStyle, DescriptionStyle } from "../../../components/CommonStyles";

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
      <OutlineCard
        sx={{
          backgroundColor: (theme) =>
            type === index ? theme.palette.primary.main : "",
          borderColor: (theme) =>
            type === index ? theme.palette.primary.main : "",
        }}
        onClick={() => onClick(index)}
      >
        <CardContent sx={{ px: 5 }}>
          <Stack
            spacing={theme.shape.MAIN_VERTICAL_SPACING}
            alignItems="center"
            sx={{ textAlign: "center" }}
          >
            <RoundedImg
              alt={title}
              src={cover}
              color={type === index ? theme.palette.common.white : ""}
            />

            <TitleStyle color="inherit" variant="h5">
              {title}
            </TitleStyle>

            <DescriptionStyle color="inherit" variant="body2">
              {description}
            </DescriptionStyle>
          </Stack>
        </CardContent>
      </OutlineCard>
    </Grid>
  );
}
