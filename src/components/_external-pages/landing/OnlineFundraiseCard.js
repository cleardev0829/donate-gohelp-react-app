import PropTypes from "prop-types";
import {
  useTheme,
  experimentalStyled as styled,
} from "@material-ui/core/styles";
import { Box, Card, Link, Grid, Stack, CardContent } from "@material-ui/core";
import RoundedImg from "src/components/custom-component/RoundedImg";
import OutlineCard from "src/components/custom-component/OutlineCard";
import {
  TitleStyle,
  DescriptionStyle,
} from "../../custom-component/CommonStyles";

// ----------------------------------------------------------------------

OnlineFundraiseCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function OnlineFundraiseCard({ post, index }) {
  const theme = useTheme();
  const { cover, title, description, link } = post;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <OutlineCard>
        <CardContent sx={{ px: 5 }}>
          <Stack
            spacing={theme.shape.MAIN_VERTICAL_SPACING}
            alignItems="center"
            sx={{ textAlign: "center" }}
          >
            <RoundedImg ait={title} src={cover} />

            <TitleStyle variant="subtitle1">{title}</TitleStyle>

            <DescriptionStyle variant="body2">{description}</DescriptionStyle>

            {link && (
              <Box sx={{ height: 40 }}>
                <Link variant="body1" underline="always">
                  {link}
                </Link>
              </Box>
            )}
          </Stack>
        </CardContent>
      </OutlineCard>
    </Grid>
  );
}
