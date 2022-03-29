import { isString } from "lodash";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
// material
import { LoadingButton } from "@material-ui/lab";
import {
  alpha,
  experimentalStyled as styled,
  useTheme,
} from "@material-ui/core/styles";
import {
  Box,
  Stack,
  Button,
  Slider,
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
import { useState } from "react";
import { setCheckout } from "../../../redux/slices/fundraise";
import { CardMediaStyle, CoverImgStyle } from "../landing/TopFundraiserCard";

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
    // backgroundColor: alpha(theme.palette.grey[900], 0.72),
  },
}));

// ----------------------------------------------------------------------

FundraisePhotoEditor.propTypes = {
  formik: PropTypes.object.isRequired,
  openPreview: PropTypes.bool,
  onClosePreview: PropTypes.func,
};

export default function FundraisePhotoEditor({
  formik,
  openPreview,
  onClosePreview,
}) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {
    values,
    // handleSubmit,
    // isSubmitting,
    isValid,
    setFieldValue,
  } = formik;
  const cover = isString(values.cover) ? values.cover : values.cover?.preview;
  const hasContent = cover;

  const { checkout } = useSelector((state) => state.fundraise);
  const [state, setState] = useState({ rotate: 0, scale: 0 });

  const handleRotate = () => {
    const newRotate = state.rotate + 1;
    setState({ ...state, rotate: newRotate });
  };

  const handleScale = (e) => {
    setState({ ...state, scale: e.target.value });
  };

  const handleDone = () => {
    dispatch(
      setCheckout({ name: "cover", value: { ...values.cover, ...state } })
    );

    setState({ rotate: 0, scale: 0 });

    setFieldValue("cover", {
      ...values.cover,
      ...state,
    });
    onClosePreview();
  };

  return (
    <DialogAnimate maxWidth="md" open={openPreview} onClose={onClosePreview}>
      <DialogActions sx={{ py: 2, px: 3 }}>
        <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
          Preview
        </Typography>
        <Button onClick={onClosePreview}>Cancel</Button>
        <LoadingButton
          type="button"
          variant="contained"
          // disabled={!isValid}
          // loading={isSubmitting}
          onClick={handleDone}
        >
          Done
        </LoadingButton>
      </DialogActions>

      {hasContent ? (
        <Container>
          <CardMediaStyle>
            <CoverImgStyle
              alt={"cover"}
              src={cover}
              sx={{
                transform: `rotate(${
                  ((-1 * state.rotate) % 4) * 90
                }deg) scale(${1 + state.scale / 100})`,
              }}
            />
          </CardMediaStyle>

          <Box sx={{ mt: 2, mb: 5 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={theme.shape.MAIN_HORIZONTAL_SPACING}
            >
              <Button
                variant="outlined"
                onClick={handleRotate}
                startIcon={<Icon icon="charm:rotate-anti-clockwise" />}
              >
                Rotate
              </Button>
              <Slider
                marks={[
                  {
                    value: 0,
                    label: <Icon icon="el:minus" />,
                  },

                  {
                    value: 100,
                    label: <Icon icon="el:plus" />,
                  },
                ]}
                min={0}
                max={100}
                defaultValue={0}
                value={state.scale}
                valueLabelDisplay="auto"
                onChange={handleScale}
              />
            </Stack>
          </Box>
        </Container>
      ) : (
        <EmptyContent title="Empty content" />
      )}
    </DialogAnimate>
  );
}
