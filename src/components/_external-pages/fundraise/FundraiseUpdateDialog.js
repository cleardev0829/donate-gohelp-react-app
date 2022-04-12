import { useRef } from "react";
import PropTypes from "prop-types";
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
import { DialogAnimate } from "../../animate";
import EmptyContent from "../../EmptyContent";
import FundraiseUpdate from "./FundraiseUpdate";
import { useDispatch, useSelector } from "../../../redux/store";

// ----------------------------------------------------------------------

FundraiseUpdateDialog.propTypes = {
  uid: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default function FundraiseUpdateDialog({ uid, open, onClose }) {
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
            Post an Update
          </Typography>
        </MotionInView>
      </DialogTitle>

      <Divider />

      <DialogContent>
        <Scrollbar>
          <FundraiseUpdate uid={uid} childRef={childRef} />
        </Scrollbar>
      </DialogContent>

      <DialogActions sx={{ py: 2, px: 3 }}>
        <Button onClick={onClose}>Cancel</Button>
        <LoadingButton
          type="submit"
          variant="contained"
          // disabled={!isValid}
          loading={isLoading}
          onClick={() => childRef.current.handleSubmit()}
        >
          Submit
        </LoadingButton>
      </DialogActions>
    </DialogAnimate>
  );
}
