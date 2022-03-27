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
import { FundraiseShare } from ".";

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

PreviewHero.propTypes = {
  title: PropTypes.string,
  cover: PropTypes.string,
};

function PreviewHero({ title, cover }) {
  return (
    <HeroStyle>
      <Container
        sx={{
          top: 0,
          left: 0,
          right: 0,
          margin: "auto",
          position: "absolute",
          pt: { xs: 3, lg: 10 },
          color: "common.white",
        }}
      >
        <Typography variant="h2" component="h1">
          {title}
        </Typography>
      </Container>
    </HeroStyle>
  );
}

FundraiseShareDialog.propTypes = {
  uid: PropTypes.string,
  title: PropTypes.string,
  formik: PropTypes.object.isRequired,
  openPreview: PropTypes.bool,
  onClosePreview: PropTypes.func,
};

export default function FundraiseShareDialog({
  uid,
  title,
  formik,
  openPreview,
  onClosePreview,
}) {
  // const { values, handleSubmit, isSubmitting, isValid } = formik;
  // const { title, description, content } = values;
  // const cover = isString(values.cover) ? values.cover : values.cover?.preview;
  const hasContent = title;

  return (
    <DialogAnimate fullScreen open={openPreview} onClose={onClosePreview}>
      <DialogActions sx={{ py: 2, px: 3 }}>
        <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
          Share Fundraiser
        </Typography>
        <Button onClick={onClosePreview}>Cancel</Button>
        {/* <LoadingButton
          type="submit"
          variant="contained"
          disabled={!isValid}
          loading={isSubmitting}
          onClick={handleSubmit}
        >
          Submit
        </LoadingButton> */}
      </DialogActions>

      {hasContent ? (
        <Scrollbar>
          <FundraiseShare uid={uid} title={title} />
        </Scrollbar>
      ) : (
        <EmptyContent title="Empty content" />
      )}
    </DialogAnimate>
  );
}
