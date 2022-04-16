import { useRef } from "react";
import PropTypes from "prop-types";
import { useMoralis } from "react-moralis";
import { LoadingButton } from "@material-ui/lab";
import {
  alpha,
  useTheme,
  experimentalStyled as styled,
} from "@material-ui/core/styles";
import {
  Box,
  Button,
  Divider,
  Container,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import {
  varFadeIn,
  varFadeInUp,
  varWrapEnter,
  varFadeInRight,
  MotionInView,
} from "../../animate";
import { FundraiseShare } from ".";
import Markdown from "../../Markdown";
import { DonateMain } from "../donate";
import Scrollbar from "../../Scrollbar";
import FundraiseEdit from "./FundraiseEdit";
import { DialogAnimate } from "../../animate";
import EmptyContent from "../../EmptyContent";
import FundraiseUpdate from "./FundraiseUpdate";
import DisconnectButton from "../../custom-component/DisconnectButton";
import { useDispatch, useSelector } from "../../../redux/store";

// ----------------------------------------------------------------------

ProfileDialog.propTypes = {
  uid: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default function ProfileDialog({ uid, open, onClose }) {
  const theme = useTheme();
  const childRef = useRef();
  const isLight = theme.palette.mode === "light";
  const { isLoading } = useSelector((state) => state.fundraise);

  return (
    <DialogAnimate maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>
        <MotionInView variants={varFadeInUp}>
          <Typography
            variant="h5"
            paragraph
            sx={{
              ...(!isLight && {
                textShadow: (theme) =>
                  `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`,
              }),
            }}
          >
            Profile
          </Typography>
        </MotionInView>
      </DialogTitle>

      <Divider />

      <DialogContent>
        {/* <Scrollbar>
          <FundraiseEdit uid={uid} childRef={childRef} />
        </Scrollbar> */}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <DisconnectButton variant="contained" />
      </DialogActions>
    </DialogAnimate>
  );
}
