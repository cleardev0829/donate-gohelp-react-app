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
        {/* <Typography variant="h2" component="h1">
          {title}
        </Typography> */}
      </Container>
    </HeroStyle>
  );
}

FundraisePhotoEditor.propTypes = {
  formik: PropTypes.object.isRequired,
  openPreview: PropTypes.bool,
  onClosePreview: PropTypes.func,
};

export default function FundraisePhotoEditor({
  formik,
  openPreview,
  onClosePreview,
  file,
}) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { values, handleSubmit, isSubmitting, isValid } = formik;
  const { title, description, content } = values;
  const cover = isString(values.cover) ? values.cover : values.cover?.preview;
  const hasContent = title || description || content || cover;
  const hasHero = title || cover;
  const { checkout } = useSelector((state) => state.fundraise);
  const [scale, setScale] = useState(0);
  const [rotate, setRotate] = useState(0);

  const handleRotate = () => {
    const newRotate = rotate + 1;
    setRotate(newRotate);
  };

  const handleScale = (e) => {
    setScale(e.target.value);
  };

  const handleDone = () => {
    dispatch(setCheckout({ name: "rotate", value: rotate }));
    dispatch(setCheckout({ name: "scale", value: scale }));
    setScale(0);
    setRotate(0);
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
          disabled={!isValid}
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
              src={isString(file) ? file : file.preview}
              sx={{
                transform: `rotate(${((-1 * rotate) % 4) * 90}deg) scale(${
                  1 + scale / 100
                })`,
              }}
            />
          </CardMediaStyle>
          {/* <Box
            component="img"
            alt="file preview"
            src={isString(file) ? file : file.preview}
            sx={{
              top: 8,
              borderRadius: 0,
              objectFit: "cover",
              position: "absolute",
              width: "calc(100% )",
              // height: "calc(100% )",
              transform: `rotate(${((-1 * rotate) % 4) * 90}deg) scale(${
                1 + scale / 100
              })`,
              overflow: "hidden",
            }}
          /> */}
          {/* {hasHero && <PreviewHero title={title} cover={cover} />} */}

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
                value={scale}
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
