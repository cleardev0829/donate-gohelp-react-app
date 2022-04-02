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
import { CardMediaStyle, CoverImgStyle, TitleStyle } from "./TopFundraiserCard";
import { setCheckout, onGotoStep } from "../../../redux/slices/fundraise";
import { useSelector, useDispatch } from "../../../redux/store";
import OutlineCard from "src/components/OutlineCard";

StartFundraiseCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default function StartFundraiseCard({ post }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, cover, title } = post;

  const handleNavigate = () => {
    dispatch(
      setCheckout({
        name: "type",
        value: id < 2 ? 0 : 1,
      })
    );
    dispatch(onGotoStep(0));
    navigate(PATH_PAGE.fundraise);
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Box sx={{ cursor: "pointer" }} onClick={handleNavigate}>
        <OutlineCard>
          <CardContent>
            <CardMediaStyle>
              <CoverImgStyle alt={title} src={cover} />
            </CardMediaStyle>

            <TitleStyle
              color="inherit"
              variant="h5"
              sx={{
                mt: theme.shape.MAIN_VERTICAL_SPACING,
              }}
            >
              {title}
            </TitleStyle>
          </CardContent>
        </OutlineCard>
      </Box>
    </Grid>
  );
}
