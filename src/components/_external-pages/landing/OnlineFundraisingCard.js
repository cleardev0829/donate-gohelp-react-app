import PropTypes from "prop-types";
import {
  experimentalStyled as styled,
  useTheme,
} from "@material-ui/core/styles";
import { Box, Card, Link, Grid, Stack, Typography } from "@material-ui/core";
import { TitleStyle, DescriptionStyle } from "./TopFundraiserCard";
import RoundedImg from "src/components/RoundedImg";

// ----------------------------------------------------------------------

export const CardStyle = styled(Card)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "column",
  textAlign: "center",
  border: "1px solid #DADADA",
  borderRadius: "12px",
  backgroundColor: theme.palette.background.body,
  padding: theme.spacing(theme.shape.CARD_PADDING),
}));

export const CardContentStyle = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  textAlign: "center",
  paddingTop: theme.spacing(4),
}));

// ----------------------------------------------------------------------

OnlineFundraisingCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function OnlineFundraisingCard({ post, index }) {
  const { cover, title, description, link } = post;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <CardStyle sx={{ position: "relative" }}>
        <RoundedImg ait={title} src={cover} />

        <Stack>
          <Stack spacing={1} sx={{ my: 2 }}>
            <TitleStyle color="inherit" variant="h5" sx={{ height: 64 }}>
              {title}
            </TitleStyle>
            <DescriptionStyle color="inherit" variant="p1">
              {description}
            </DescriptionStyle>
          </Stack>

          {link && (
            <Box sx={{ height: 40 }}>
              <Link variant="body1" underline="always">
                {link}
              </Link>
            </Box>
          )}
        </Stack>
      </CardStyle>
    </Grid>
  );
}
