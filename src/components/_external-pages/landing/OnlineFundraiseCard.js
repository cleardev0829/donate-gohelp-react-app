import PropTypes from "prop-types";
import {
  experimentalStyled as styled,
  useTheme,
} from "@material-ui/core/styles";
import {
  Box,
  Icon,
  Card,
  Link,
  Grid,
  Stack,
  Avatar,
  Typography,
  CardContent,
} from "@material-ui/core";
import { TitleStyle, DescriptionStyle } from "./TopFundraiserCard";
import RoundedImg from "src/components/RoundedImg";
import OutlineCard from "src/components/OutlineCard";

// ----------------------------------------------------------------------

export const CardStyle = styled(Card)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "column",
  textAlign: "center",
  border: "1px solid #DADADA",
  borderRadius: "12px",
  backgroundColor: theme.palette.background.default,
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

            <TitleStyle variant="h5">{title}</TitleStyle>

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
