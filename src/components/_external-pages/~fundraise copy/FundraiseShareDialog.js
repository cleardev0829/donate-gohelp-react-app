import PropTypes from "prop-types";
import {
  alpha,
  useTheme,
  experimentalStyled as styled,
} from "@material-ui/core/styles";
import {
  Box,
  Stack,
  Button,
  Divider,
  Container,
  Typography,
  CardContent,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import { FundraiseShare } from ".";
import Markdown from "../../Markdown";
import { DonateMain } from "../donate";
import Scrollbar from "../../Scrollbar";
import { DialogAnimate } from "../../animate";
import EmptyContent from "../../EmptyContent";
import { PATH_PAGE } from "../../../routes/paths";
import { useDispatch, useSelector } from "../../../redux/store";

// ----------------------------------------------------------------------

const HeroStyle = styled("div")(({ theme }) => ({
  paddingTop: "56%",
  position: "relative",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  "&:before": {
    top: 0,
    content: "''",
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: alpha(theme.palette.grey[900], 0.72),
  },
}));

// ----------------------------------------------------------------------

FundraiseShareDialog.propTypes = {
  post: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default function FundraiseShareDialog({ post, open, onClose }) {
  const theme = useTheme();

  return (
    <DialogAnimate open={open} onClose={onClose}>
      <CardContent sx={{ px: 3 }}>
        <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
          Share Fundraiser
        </Typography>
      </CardContent>

      <Divider />

      <DialogContent>
        <Scrollbar>
          <FundraiseShare post={post} />
        </Scrollbar>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </DialogAnimate>
  );
}
