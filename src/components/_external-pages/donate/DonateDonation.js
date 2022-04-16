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
import {
  CardMediaStyle,
  CoverImgStyle,
} from "../../custom-component/CommonStyles";
import OutlineCard from "../../custom-component/OutlineCard";
import { FundraiseHeader } from "../fundraise";
import fakeRequest from "../../../utils/fakeRequest";
import { useDispatch, useSelector } from "../../../redux/store";
import { fCurrency, fPercent } from "../../../utils/formatNumber";
import { filters, CRYPTO_TYPES, cryptoToUSD } from "src/utils/constants";

// ----------------------------------------------------------------------

DonateDonation.propTypes = {
  post: PropTypes.object,
  formik: PropTypes.object,
};

export default function DonateDonation({ post, formik }) {
  const theme = useTheme();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filter = filters(post.donates);
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [isHidden, setHidden] = useState(true);
  const isLight = theme.palette.mode === "light";
  const { checkout } = useSelector((state) => state.donate);

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
        <Container>
          <Grid container spacing={theme.shape.CARD_CONTENT_SPACING}>
            <Grid item xs={12} md={12}>
              <Box>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  sx={{
                    ...(!isLight && {
                      textShadow: (theme) =>
                        `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`,
                    }),
                  }}
                >
                  {post.title}
                </Typography>

                <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
                  <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
                    <Stack
                      direction="row"
                      justifyContent={"space-between"}
                      alignItems="center"
                    >
                      <Typography
                        variant="body2"
                        noWrap
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
                        Donate with
                      </Typography>
                      <TextField
                        size="small"
                        label="Select type of token"
                        {...getFieldProps("cryptoType")}
                        error={Boolean(touched.cryptoType && errors.cryptoType)}
                        // helperText={touched.cryptoType && errors.cryptoType}
                        select
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        sx={{ width: 200 }}
                      >
                        {CRYPTO_TYPES.map((option) => (
                          <MenuItem
                            key={`menuitem-${option.name}`}
                            value={option.name}
                          >
                            <Stack
                              key={`stack-${option.name}`}
                              spacing={theme.shape.CARD_CONTENT_SPACING}
                              direction="row"
                              alignItems={"center"}
                            >
                              <img
                                key={`img-${option.name}`}
                                src={`/static/coins/${option.name}.webp`}
                                height="18"
                              />
                              <span key={`span-${option.name}`}>
                                {option.name}
                              </span>
                            </Stack>
                          </MenuItem>
                        ))}
                      </TextField>
                    </Stack>

                    <Stack
                      direction="row"
                      justifyContent={"space-between"}
                      alignItems="center"
                    >
                      <Typography
                        variant="body2"
                        noWrap
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
                        Number of token
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        label="Enter number of token"
                        {...getFieldProps("cryptoCount")}
                        error={Boolean(
                          touched.cryptoCount && errors.cryptoCount
                        )}
                        // helperText={touched.cryptoCount && errors.cryptoCount}
                        onFocus={(e) => {
                          e.target.select();
                        }}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        sx={{ width: 200 }}
                      />
                    </Stack>
                  </Stack>

                  <Stack>
                    <Typography variant="body2" sx={{ display: "block" }}>
                      Tip GoHelp Services
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ display: "block", color: "text.disabled" }}
                    >
                      GoHelp has a 0% platform fee for organizers. GoFundMe will
                      continue offering its services thanks to donors who will
                      leave an optional amount here:
                    </Typography>
                  </Stack>

                  <Stack
                    direction="row"
                    justifyContent={"space-between"}
                    alignItems="center"
                  >
                    <Typography
                      variant="body2"
                      noWrap
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
                      Tip(%)
                    </Typography>
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
                            <Typography variant="body2">%</Typography>
                          </InputAdornment>
                        ),
                      }}
                      sx={{ width: 200 }}
                    />
                  </Stack>

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Stack>
                      <Typography variant="body2">Total donation</Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "text.disabled" }}
                      >
                        wallet address
                      </Typography>
                    </Stack>
                    <Typography variant="subtitle2">
                      {`${fCurrency(filter.totalAmount)}`}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Form>
    </FormikProvider>
  );
}
