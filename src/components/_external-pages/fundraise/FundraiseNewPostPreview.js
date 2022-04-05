import { isString } from "lodash";
import PropTypes from "prop-types";
import { LoadingButton } from "@material-ui/lab";
import { alpha, experimentalStyled as styled } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Container,
  Typography,
  DialogActions,
} from "@material-ui/core";
import Markdown from "../../Markdown";
import { Donate } from "../../../pages/donate/Donate";
import Scrollbar from "../../Scrollbar";
import EmptyContent from "../../EmptyContent";
import { DialogAnimate } from "../../animate";
import { useDispatch, useSelector } from "../../../redux/store";

// ----------------------------------------------------------------------

FundraiseNewPostPreview.propTypes = {
  formik: PropTypes.object.isRequired,
  openPreview: PropTypes.bool,
  onClosePreview: PropTypes.func,
};

export default function FundraiseNewPostPreview({
  formik,
  openPreview,
  onClosePreview,
}) {
  const { values, handleSubmit, isSubmitting, isValid } = formik;
  const { title, description, content } = values;
  const cover = isString(values.cover) ? values.cover : values.cover?.preview;
  const hasContent = title || description || content || cover;
  const { checkout } = useSelector((state) => state.fundraise);

  return (
    <DialogAnimate fullScreen open={openPreview} onClose={onClosePreview}>
      <DialogActions sx={{ py: 2, px: 3 }}>
        <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
          Preview Fundraiser
        </Typography>
        <Button onClick={onClosePreview}>Cancel</Button>
        <LoadingButton
          type="submit"
          variant="contained"
          disabled={!isValid}
          loading={isSubmitting}
          onClick={handleSubmit}
        >
          Submit
        </LoadingButton>
      </DialogActions>

      {hasContent ? (
        <Scrollbar>
          {/* <Donate
            post={{
              ...checkout,
              donates: [],
            }}
          /> */}
        </Scrollbar>
      ) : (
        <EmptyContent title="Empty content" />
      )}
    </DialogAnimate>
  );
}
