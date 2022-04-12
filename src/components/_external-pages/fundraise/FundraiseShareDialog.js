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
import Markdown from "../../Markdown";
import Scrollbar from "../../Scrollbar";
import FundraiseShare from "./FundraiseShare";
import { DialogAnimate } from "../../animate";
import EmptyContent from "../../EmptyContent";
import { PATH_PAGE } from "../../../routes/paths";
import { useDispatch, useSelector } from "../../../redux/store";

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
