import { Link as RouterLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import {
  alpha,
  useTheme,
  experimentalStyled as styled,
} from "@material-ui/core/styles";
import { Box, Grid, CardContent } from "@material-ui/core";
import {
  varFadeIn,
  varFadeInUp,
  varWrapEnter,
  varFadeInRight,
} from "../../animate";
import {
  CardMediaStyle,
  CoverImgStyle,
  TitleStyle,
} from "../../../components/CommonStyles";
import { PATH_PAGE } from "../../../routes/paths";
import OutlineCard from "../../../components/OutlineCard";
import { useSelector, useDispatch } from "../../../redux/store";
import { setCheckout, onGotoStep } from "../../../redux/slices/fundraise";

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
