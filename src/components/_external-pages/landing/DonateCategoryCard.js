import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// material
import {
  alpha,
  useTheme,
  experimentalStyled as styled,
} from "@material-ui/core/styles";
import { Box, Grid, Stack, Button, CardContent } from "@material-ui/core";
// routes
import {
  varFadeIn,
  varFadeInUp,
  varWrapEnter,
  varFadeInRight,
} from "../../animate";
import { PATH_PAGE } from "../../../routes/paths";
import { TitleStyle } from "../../custom-component/CommonStyles";
import { useSelector, useDispatch } from "../../../redux/store";
import { setCheckout, onGotoStep } from "../../../redux/slices/fundraise";

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
      setCheckout({
        name: "type",
        value: 0,
      })
    );
    dispatch(
      setCheckout({
        name: "category",
        value: category,
      })
    );
    dispatch(onGotoStep(0));

    navigate(PATH_PAGE.view);
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
