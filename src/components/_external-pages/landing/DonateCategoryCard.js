import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { paramCase } from "change-case";
import eyeFill from "@iconify/icons-eva/eye-fill";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import shareFill from "@iconify/icons-eva/share-fill";
import messageCircleFill from "@iconify/icons-eva/message-circle-fill";
import { fPercent, fCurrency } from "../../../utils/formatNumber";
// material
import {
  alpha,
  experimentalStyled as styled,
  useTheme,
} from "@material-ui/core/styles";
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
import { applyCheckout, onGotoStep } from "../../../redux/slices/fundraise";
import { useSelector, useDispatch } from "../../../redux/store";

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
}));

const ImageStyle = styled("img")({
  width: "80px",
  height: "80px",
});

// ----------------------------------------------------------------------

DonateCategoryCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default function DonateCategoryCard({ post }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const { id, cover, category } = post;

  const handleNavigate = () => {
    dispatch(
      applyCheckout({
        name: "type",
        value: 0,
      })
    );
    dispatch(
      applyCheckout({
        name: "category",
        value: category,
      })
    );
    dispatch(onGotoStep(0));

    navigate(PATH_PAGE.fundraise);
  };

  return (
    <Grid item xs={12} sm={6} md={2}>
      <Box sx={{ cursor: "pointer" }} onClick={handleNavigate}>
        <CardStyle>
          <CardContent
            sx={{
              width: "168px",
              height: "168px",
              backgroundColor: "rgba(62, 180, 137, 0.04)",
              borderRadius: 2,
            }}
          >
            <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
              <CardMediaStyle>
                <ImageStyle alt={category} src={cover} />
              </CardMediaStyle>

              <TitleStyle color="inherit" variant="h7">
                {category}
              </TitleStyle>
            </Stack>
          </CardContent>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              mt: 1,
            }}
          >
            <motion.div variants={varFadeInRight}>
              <Button
                size="small"
                variant="contained"
                component={RouterLink}
                to={PATH_PAGE.donate}
              >
                Donate
              </Button>
            </motion.div>
          </Box>
        </CardStyle>
      </Box>
    </Grid>
  );
}
