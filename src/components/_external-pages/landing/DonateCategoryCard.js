import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { paramCase } from "change-case";
import eyeFill from "@iconify/icons-eva/eye-fill";
import { Link as RouterLink } from "react-router-dom";
import shareFill from "@iconify/icons-eva/share-fill";
import messageCircleFill from "@iconify/icons-eva/message-circle-fill";
import { fPercent, fCurrency } from "../../../utils/formatNumber";
// material
import { alpha, experimentalStyled as styled } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Link,
  Card,
  Grid,
  Stack,
  Avatar,
  Typography,
  CardContent,
} from "@material-ui/core";
import { MLinearProgress } from "../../@material-extend";
// routes
import { PATH_DASHBOARD, PATH_PAGE } from "../../../routes/paths";
// utils
import { fDate } from "../../../utils/formatTime";
import { fShortenNumber } from "../../../utils/formatNumber";
//
import SvgIconStyle from "../../SvgIconStyle";
import {
  varFadeIn,
  varFadeInUp,
  varWrapEnter,
  varFadeInRight,
} from "../../animate";
import { TitleStyle } from "./TopFundraiserCard";

// ----------------------------------------------------------------------

const CardStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  textAlign: "center",
}));

const CardMediaStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  padding: theme.spacing(2, 2),
}));

const ImageStyle = styled("img")({
  width: 80,
  height: 80,
});

// ----------------------------------------------------------------------

DonateCategoryCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function DonateCategoryCard({ post, index }) {
  const { cover, title } = post;
  const linkTo = `${PATH_DASHBOARD.blog.root}/post/${paramCase(title)}`;

  return (
    <Grid item xs={12} sm={6} md={2}>
      <CardStyle sx={{ borderRadius: "8" }}>
        <CardContent
          sx={{
            width: "100%",
            backgroundColor: "rgba(62, 180, 137, 0.04)",
            borderRadius: 2,
          }}
        >
          <CardMediaStyle>
            <ImageStyle alt={title} src={cover} />
          </CardMediaStyle>

          <TitleStyle color="inherit" variant="h7" sx={{}}>
            {title}
          </TitleStyle>
        </CardContent>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mt: 1.5,
          }}
        >
          <motion.div variants={varFadeInRight}>
            <Button
              size="medium"
              variant="contained"
              component={RouterLink}
              to={PATH_PAGE.donate}
            >
              Donate
            </Button>
          </motion.div>
        </Box>
      </CardStyle>
    </Grid>
  );
}
