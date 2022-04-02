import { useCallback, useState } from "react";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import moment from "moment";
import lodash from "lodash";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { Form, FormikProvider, useFormik } from "formik";
// material
import {
  alpha,
  useTheme,
  experimentalStyled as styled,
} from "@material-ui/core/styles";
import {
  Box,
  Grid,
  Card,
  Link,
  Stack,
  Slider,
  Divider,
  MenuItem,
  TextField,
  Container,
  Typography,
  CardContent,
  InputAdornment,
} from "@material-ui/core";
import {
  addDonate,
  onBackStep,
  onNextStep,
} from "../../../redux/slices/donate";
import { FundraiseHeader } from "../fundraise";
import fakeRequest from "../../../utils/fakeRequest";
import OutlineCard from "../../../components/OutlineCard";
import { fCurrency, fPercent } from "src/utils/formatNumber";
import { useDispatch, useSelector } from "../../../redux/store";
import { filters, CRYPTO_TYPES, cryptoToUSD } from "src/utils/constants";
import { CardMediaStyle, CoverImgStyle } from "src/components/CommonStyles";

// ----------------------------------------------------------------------

const ImgStyle = styled("img")({
  // width: 40,
  height: 20,
  objectFit: "contain",
});

DonatePayment.propTypes = {
  post: PropTypes.object,
};

export default function DonatePayment({ post }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const isLight = theme.palette.mode === "light";
  const { id } = params;
  const { enqueueSnackbar } = useSnackbar();
  const { checkout } = useSelector((state) => state.donate);
  const { activeStep } = checkout;
  const [open, setOpen] = useState(false);
  const [isHidden, setHidden] = useState(true);
  const filter = filters(post.donates);

  const handleChangeToken = (value) => {};

  function valuetext(value) {
    return `0 $ ${value}%`;
  }

  const handleClosePreview = () => {
    setOpen(false);
  };

  const handleTip = () => {
    setHidden(!isHidden);
  };

  const handleBackStep = () => {
    dispatch(onBackStep());
  };

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const Schema = Yup.object().shape({
    cryptoType: Yup.string().required("This is required"),
    cryptoCount: Yup.number().min(0.0000001).required("This is required"),
    tip: Yup.number(),
  });

  const formik = useFormik({
    initialValues: {
      cryptoType: "",
      cryptoCount: 0,
      tip: 0,
      message: "",
    },
    validationSchema: Schema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await fakeRequest(500);
        resetForm();
        handleClosePreview();
        setSubmitting(false);

        dispatch(
          addDonate({
            fundraiseId: id,
            crypto: { type: values.cryptoType, count: values.cryptoCount },
            tip: values.tip,
            message: values.message,
            createdAt: moment(),
          })
        );
        enqueueSnackbar("Save success", { variant: "success" });
        navigate("/");
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    },
  });

  const {
    errors,
    values,
    touched,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    getFieldProps,
    handleChange,
  } = formik;

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <FundraiseHeader
          cancelAction={handleBackStep}
          continueAction={handleSubmit}
        />
        <Container maxWidth="lg">
          <Grid container spacing={theme.shape.MAIN_HORIZONTAL_SPACING}>
            <Grid item xs={12} md={5}>
              <Box sx={{ py: 3 }}>
                <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
                  <Box sx={{ position: "relative" }}>
                    <CardMediaStyle>
                      <CoverImgStyle
                        alt={"title"}
                        src={post.cover.preview}
                        sx={{
                          transform: `rotate(${
                            ((-1 * post.rotate) % 4) * 90
                          }deg) scale(${1 + post.scale / 100})`,
                        }}
                      />
                    </CardMediaStyle>
                  </Box>

                  <Typography variant="h5">
                    You're supporting Christina Yuna Lee Memorial Fund
                  </Typography>

                  <Typography variant="body2" sx={{ color: "text.disabled" }}>
                    Your donation will benefit Angela Yujin Lee on behalf of The
                    Lee Family
                  </Typography>

                  <Card sx={{ p: theme.shape.CARD_PADDING }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box maxWidth={125}>
                        <Typography variant="subtitle2">
                          We protect your donation
                        </Typography>
                      </Box>
                      <Divider orientation="vertical" flexItem />

                      <ImgStyle
                        src="/static/donate_protect/donate_protect_1.png"
                        alt="1"
                      />
                      <ImgStyle
                        src="/static/donate_protect/donate_protect_2.png"
                        alt="2"
                      />
                      <ImgStyle
                        src="/static/donate_protect/donate_protect_3.png"
                        alt="3"
                      />
                    </Stack>
                  </Card>
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={12} md={7}>
              <Box sx={{ py: 3 }}>
                <Box sx={{ textAlign: "right" }}>
                  <Typography variant="body2" sx={{ color: "text.disabled" }}>
                    By continuing, you agree to the GoFundMe terms and privacy
                    policy.
                  </Typography>
                </Box>

                <Card sx={{ p: theme.shape.CARD_PADDING }}>
                  <Stack spacing={theme.shape.MAIN_VERTICAL_SPACING}>
                    <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
                      <Typography
                        variant="h5"
                        sx={{
                          ...(!isLight && {
                            textShadow: (theme) =>
                              `4px 4px 16px ${alpha(
                                theme.palette.grey[800],
                                0.48
                              )}`,
                          }),
                        }}
                      >
                        Enter your donation
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        label="Select type of token"
                        {...getFieldProps("cryptoType")}
                        error={Boolean(touched.cryptoType && errors.cryptoType)}
                        helperText={touched.cryptoType && errors.cryptoType}
                        select
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      >
                        {CRYPTO_TYPES.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        fullWidth
                        size="small"
                        label="Enter number of token"
                        {...getFieldProps("cryptoCount")}
                        error={Boolean(
                          touched.cryptoCount && errors.cryptoCount
                        )}
                        helperText={touched.cryptoCount && errors.cryptoCount}
                        onFocus={(e) => {
                          e.target.select();
                        }}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                    </Stack>

                    <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
                      <Typography variant="subtitle1" sx={{ display: "block" }}>
                        Tip GoHelp Services
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ display: "block", color: "text.disabled" }}
                      >
                        GoHelp has a 0% platform fee for organizers. GoFundMe
                        will continue offering its services thanks to donors who
                        will leave an optional amount here:
                      </Typography>
                    </Stack>

                    {activeStep === 0 && (
                      <Slider
                        marks={[
                          {
                            value: 0,
                            label: "0%",
                          },

                          {
                            value: 100,
                            label: "100%",
                          },
                        ]}
                        min={0}
                        // step={10}
                        max={100}
                        defaultValue={0}
                        value={values.tip}
                        getAriaValueText={valuetext}
                        valueLabelDisplay="auto"
                        onChange={handleChangeToken}
                      />
                    )}

                    {!isHidden && (
                      <TextField
                        fullWidth
                        size="small"
                        label="Enter Tip amount"
                        {...getFieldProps("tip")}
                        error={Boolean(touched.tip && errors.tip)}
                        helperText={touched.tip && errors.tip}
                        onFocus={(e) => {
                          e.target.select();
                        }}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Typography
                                variant="h5"
                                // sx={{
                                //   ...(!isLight && {
                                //     textShadow: (theme) =>
                                //       `4px 4px 16px ${alpha(
                                //         theme.palette.grey[800],
                                //         0.48
                                //       )}`,
                                //   }),
                                // }}
                              >
                                %
                              </Typography>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}

                    <Link
                      variant="body2"
                      underline="always"
                      sx={{ cursor: "pointer" }}
                      onClick={handleTip}
                    >
                      Enter custom tip
                    </Link>

                    <OutlineCard>
                      <CardContent>
                        <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Typography variant="subtitle2">
                              Top donation
                            </Typography>
                            <Typography gutterBottom variant="subtitle1">
                              {`${fCurrency(filter.maxAmount)}`}
                            </Typography>
                          </Stack>

                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Typography variant="subtitle2">
                              GoHelp tip
                            </Typography>
                            {values.tip > 0 && (
                              <Typography gutterBottom variant="subtitle1">
                                {`${fCurrency(
                                  cryptoToUSD({
                                    count:
                                      (values.cryptoCount * values.tip) / 100,
                                    type: values.cryptoType,
                                  })
                                )}(${(values.cryptoCount * values.tip) / 100} ${
                                  values.cryptoType
                                })`}
                              </Typography>
                            )}
                          </Stack>

                          <Divider flexItem />

                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Typography variant="subtitle2">
                              Total due
                            </Typography>
                            {values.cryptoCount > 0 && (
                              <Typography gutterBottom variant="subtitle1">
                                {`${fCurrency(
                                  cryptoToUSD({
                                    count:
                                      parseFloat(values.cryptoCount) +
                                      (values.cryptoCount * values.tip) / 100,
                                    type: values.cryptoType,
                                  })
                                )}(${
                                  parseFloat(values.cryptoCount) +
                                  (values.cryptoCount * values.tip) / 100
                                } ${values.cryptoType})`}
                              </Typography>
                            )}
                          </Stack>
                        </Stack>
                      </CardContent>
                    </OutlineCard>

                    <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
                      <Typography variant="subtitle1">
                        Leave a message
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        minRows={3}
                        maxRows={20}
                        size="small"
                        label="Enter your message"
                        {...getFieldProps("message")}
                        error={Boolean(touched.message && errors.message)}
                        helperText={touched.message && errors.message}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                    </Stack>
                  </Stack>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Form>
    </FormikProvider>
  );
}
