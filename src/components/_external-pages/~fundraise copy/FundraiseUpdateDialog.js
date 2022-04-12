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
import FundraiseUpdate from "./FundraiseUpdate";

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

FundraiseUpdateDialog.propTypes = {
  uid: PropTypes.string,
  data: PropTypes.object,
  openPreview: PropTypes.bool,
  onClosePreview: PropTypes.func,
};

export default function FundraiseUpdateDialog({
  uid,
  data,
  openPreview,
  onClosePreview,
}) {
  const { description, cover } = data;

  const hasContent = description || cover;

  return (
    <DialogAnimate fullScreen open={openPreview} onClose={onClosePreview}>
      <DialogActions sx={{ py: 2, px: 3 }}>
        <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
          Update Fundraiser
        </Typography>
        <Button onClick={onClosePreview}>Cancel</Button>
        <LoadingButton
          type="submit"
          variant="contained"
          // disabled={!isValid}
          // loading={isSubmitting}
          // onClick={handleSubmit}
        >
          Submit
        </LoadingButton>
      </DialogActions>

      {hasContent ? (
        <Scrollbar>
          <FundraiseUpdate uid={uid} data={data} />
        </Scrollbar>
      ) : (
        <EmptyContent title="Empty content" />
      )}
    </DialogAnimate>
  );
}
