import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { useCallback, useState } from "react";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Form, FormikProvider, useFormik } from "formik";
import moment from "moment";
import lodash from "lodash";
// material
import {
  experimentalStyled as styled,
  useTheme,
} from "@material-ui/core/styles";
import {
  Box,
  Grid,
  Card,
  Link,
  Stack,
  Button,
  Divider,
  Slider,
  TextField,
  Container,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "../../../redux/store";
import { PATH_DASHBOARD } from "../../../routes/paths";
import fakeRequest from "../../../utils/fakeRequest";
import useAuth from "../../../hooks/useAuth";
import { FundraiseHeader } from "../fundraise";
import {
  onBackStep,
  onNextStep,
  setCheckout,
  addDonate,
} from "../../../redux/slices/donate";
import { fPercent } from "src/utils/formatNumber";
import { filters } from "src/utils/constants";

// ----------------------------------------------------------------------

const IMG = (index) => `/static/fundraisers/fundraiser_${index}.png`;

const marks = [
  {
    value: 0,
    label: "0%",
  },

  {
    value: 100,
    label: "100%",
  },
];

const CardMediaStyle = styled("div")({
  // height: 100,
  position: "relative",
  paddingTop: "calc(100% * 3 / 4)",
});

const CoverImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "contain",
  // objectFit: "cover",
  position: "absolute",
});

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
  const { id } = params;
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { checkout } = useSelector((state) => state.donate);
  const { activeStep } = checkout;
  const [open, setOpen] = useState(false);
  const [isHidden, setHidden] = useState(true);
  const filter = filters(post.donates);

  const handleChangeToken = (value) => {};

  function valuetext(value) {
    return `0 Token ${value}%`;
  }

  const handleClosePreview = () => {
    setOpen(false);
  };

  const handleCheckout = ({ name, value }) => {
    dispatch(
      setCheckout({
        name,
        value,
      })
    );
  };

  const handleCustomTip = () => {
    setHidden(!isHidden);
  };

  const handleBackStep = () => {
    dispatch(onBackStep());
  };

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const Schema = Yup.object().shape({
    amount: Yup.number().required("This is required"),
    // tipAmount: Yup.number().required("This is required"),
    // message: Yup.string().required("This is required"),
  });

  const formik = useFormik({
    initialValues: {
      amount: checkout.amount,
      tipAmount: checkout.tipAmount,
      message: checkout.message,
    },
    validationSchema: Schema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await fakeRequest(500);
        resetForm();
        handleClosePreview();
        setSubmitting(false);

        dispatch(
          addDonate({ ...checkout, fundraiseId: id, createdAt: moment() })
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
                <Stack spacing={theme.shape.MAIN_VERTICAL_SPACING}>
                  <Box sx={{ position: "relative" }}>
                    <CardMediaStyle>
                      <CoverImgStyle alt={"title"} src={IMG(1)} />
                    </CardMediaStyle>
                  </Box>

                  <Typography variant="h4">
                    You're supporting Christina Yuna Lee Memorial Fund
                  </Typography>

                  <Typography variant="body2">
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
                        <Typography variant="h7">
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
                  <Typography variant="body2">
                    By continuing, you agree to the GoFundMe terms and privacy
                    policy.
                  </Typography>
                </Box>

                <Card sx={{ p: theme.shape.CARD_PADDING }}>
                  <Stack spacing={theme.shape.MAIN_VERTICAL_SPACING}>
                    <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
                      <Typography variant="h4">Enter your donation</Typography>
                      <TextField
                        fullWidth
                        size="small"
                        label="Enter number of token"
                        {...getFieldProps("amount")}
                        error={Boolean(touched.amount && errors.amount)}
                        helperText={touched.amount && errors.amount}
                        onChange={(e) => {
                          handleCheckout({
                            name: e.target.name,
                            value: e.target.value,
                          });
                          handleChange(e);
                        }}
                      />
                    </Stack>

                    <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
                      <Typography variant="h7" sx={{ display: "block" }}>
                        Tip GoHelp Services
                      </Typography>
                      <Typography variant="h7" sx={{ display: "block" }}>
                        GoHelp has a 0% platform fee for organizers. GoFundMe
                        will continue offering its services thanks to donors who
                        will leave an optional amount here:
                      </Typography>
                    </Stack>

                    {activeStep === 0 && (
                      <Slider
                        marks={marks}
                        min={1}
                        step={10}
                        max={100}
                        defaultValue={0}
                        value={
                          (filter.totalAmount * 100) / parseFloat(post.goal)
                        }
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
                        {...getFieldProps("tipAmount")}
                        error={Boolean(touched.tipAmount && errors.tipAmount)}
                        helperText={touched.tipAmount && errors.tipAmount}
                        onChange={(e) => {
                          handleCheckout({
                            name: e.target.name,
                            value: e.target.value,
                          });
                          handleChange(e);
                        }}
                      />
                    )}

                    <Link
                      variant="body2"
                      underline="always"
                      sx={{ cursor: "pointer" }}
                      onClick={handleCustomTip}
                    >
                      Enter custom tip
                    </Link>

                    <Box
                      sx={{
                        borderColor: "background.primary",
                        border: "solid 1px",
                        borderRadius: 1,
                        p: 2,
                      }}
                    >
                      <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography variant="h7">Top donation</Typography>
                          <Typography gutterBottom variant="p1">
                            {filter.maxAmount}
                          </Typography>
                        </Stack>

                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography variant="h7">GoHelp tip</Typography>
                          <Typography gutterBottom variant="p1">
                            {checkout.defaultTip}
                          </Typography>
                        </Stack>

                        <Divider flexItem />

                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography variant="h7">Total due</Typography>
                          <Typography gutterBottom variant="p1">
                            {filter.totalAmount}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Box>

                    <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
                      <Typography variant="h4">Leave a message</Typography>
                      <TextField
                        fullWidth
                        size="small"
                        label="Enter your message"
                        {...getFieldProps("message")}
                        error={Boolean(touched.message && errors.message)}
                        helperText={touched.message && errors.message}
                        onChange={(e) => {
                          handleCheckout({
                            name: e.target.name,
                            value: e.target.value,
                          });
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
