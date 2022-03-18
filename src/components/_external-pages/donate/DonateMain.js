import PropTypes from "prop-types";
// material
import {
  experimentalStyled as styled,
  useTheme,
} from "@material-ui/core/styles";
import {
  Grid,
  Stack,
  Tab,
  Box,
  Card,
  Tabs,
  Button,
  Container,
} from "@material-ui/core";
// redux
import { useDispatch, useSelector } from "../../../redux/store";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// hooks
import useAuth from "../../../hooks/useAuth";
// components
import DonateList from "./DonateList";
import DonateSupports from "./DonateSupports";
import DonateToken from "./DonateToken";
import DonateProfile from "./DonateProfile";
// ----------------------------------------------------------------------

DonateMain.propTypes = {
  post: PropTypes.object.isRequired,
};

export default function DonateMain({ post }) {
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <Box>
      <Box>
        <Grid container spacing={theme.shape.MAIN_HORIZONTAL_SPACING}>
          <Grid item xs={12} md={7}>
            <Stack spacing={theme.shape.MAIN_VERTICAL_SPACING}>
              <DonateProfile post={post} />
              <DonateList post={post} />
            </Stack>
          </Grid>

          <Grid item xs={12} md={5}>
            <DonateToken post={post} />
          </Grid>
        </Grid>
      </Box>

      <DonateSupports post={post} />
    </Box>
  );
}
