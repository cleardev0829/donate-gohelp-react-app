import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { paramCase } from "change-case";
import eyeFill from "@iconify/icons-eva/eye-fill";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { fPercent, fCurrency } from "../../../utils/formatNumber";
import { alpha, experimentalStyled as styled } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Link,
  Card,
  Grid,
  Stack,
  Typography,
  CardContent,
} from "@material-ui/core";
import { PATH_DASHBOARD, PATH_PAGE } from "../../../routes/paths";
import { fDate } from "../../../utils/formatTime";
import { fShortenNumber } from "../../../utils/formatNumber";
import SvgIconStyle from "../../SvgIconStyle";
import {
  varFadeIn,
  varFadeInUp,
  varWrapEnter,
  varFadeInRight,
} from "../../animate";
import ProgressItem from "../../ProgressItem";

// ----------------------------------------------------------------------

export const CARD_BRODER_RADIUS = 2;

export const CardContentStyle = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2, 2),
}));

export const CardMediaStyle = styled("div")({
  position: "relative",
  paddingTop: "calc(100% * 3 / 4)",
});

export const CoverImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
  borderRadius: 8,
});

export const TitleStyle = styled(Typography)({
  overflow: "hidden",
  WebkitLineClamp: 2,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
});

export const DescriptionStyle = styled(Typography)({
  height: 70,
  overflow: "hidden",
  WebkitLineClamp: 3,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
});

const CountryStyle = styled(Box)(({ theme }) => ({
  zIndex: 9,
  position: "absolute",
  left: theme.spacing(3),
  bottom: theme.spacing(2),
  backgroundColor: "#333333",
  borderRadius: 8,
  padding: theme.spacing(0.75, 3),
}));

// ----------------------------------------------------------------------

TopFundraiserCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function TopFundraiserCard({ post, index }) {
  const navigate = useNavigate();
  const { cover, title, description, country } = post;
  const linkTo = `${PATH_DASHBOARD.blog.root}/post/${paramCase(title)}`;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ position: "relative" }}>
        <CardContentStyle>
          <Box
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(PATH_PAGE.fundraising)}
          >
            <Stack>
              <CardMediaStyle>
                <CountryStyle>
                  <Typography
                    variant="p1"
                    sx={{
                      display: "block",
                      color: (theme) => theme.palette.common.white,
                    }}
                  >
                    {country}
                  </Typography>
                </CountryStyle>
                <CoverImgStyle alt={title} src={cover} />
              </CardMediaStyle>

              <Stack spacing={1} sx={{ my: 2 }}>
                <TitleStyle color="inherit" variant="h5" sx={{ height: 64 }}>
                  {title}
                </TitleStyle>

                <DescriptionStyle color="inherit" variant="p1">
                  {description}
                </DescriptionStyle>
              </Stack>

              <ProgressItem
                key={" Last donation 3 min ago"}
                progress={{ value: 78 }}
                index={0}
              />

              <Typography
                gutterBottom
                variant="p1"
                sx={{ display: "block", mt: 2 }}
              >
                7,800 token raised of 10,000 Token
              </Typography>
            </Stack>
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              mt: 2,
            }}
          >
            <motion.div variants={varFadeInRight}>
              <Button
                size="large"
                variant="contained"
                component={RouterLink}
                to={PATH_PAGE.donate}
              >
                Donate
              </Button>
            </motion.div>
          </Box>
        </CardContentStyle>
      </Card>
    </Grid>
  );
}
