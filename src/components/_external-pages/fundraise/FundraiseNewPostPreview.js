import { isString } from "lodash";
import PropTypes from "prop-types";
// material
import { LoadingButton } from "@material-ui/lab";
import { alpha, experimentalStyled as styled } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Container,
  Typography,
  DialogActions,
} from "@material-ui/core";
//
import { DialogAnimate } from "../../animate";
import Markdown from "../../Markdown";
import Scrollbar from "../../Scrollbar";
import EmptyContent from "../../EmptyContent";
import { DonateMain } from "../donate";
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
          <DonateMain
            post={{
              ...checkout,
              donates: [],
            }}
          />
        </Scrollbar>
      ) : (
        <EmptyContent title="Empty content" />
      )}
    </DialogAnimate>
  );
}
