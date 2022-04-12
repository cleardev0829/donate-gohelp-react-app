import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import _ from "lodash";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useSnackbar } from "notistack";
import radioButtonOffOutline from "@iconify/icons-eva/radio-button-off-outline";
import checkmarkCircle2Outline from "@iconify/icons-eva/checkmark-circle-2-outline";
import { Form, FormikProvider, useFormik } from "formik";
import {
  alpha,
  useTheme,
  experimentalStyled as styled,
} from "@material-ui/core/styles";
import {
  Box,
  Card,
  Grid,
  Stack,
  Button,
  MenuItem,
  Checkbox,
  TextField,
  Container,
  Typography,
  InputAdornment,
  FormHelperText,
} from "@material-ui/core";
import {
  resetPost,
  updatePost,
  setCheckout,
  getPost,
} from "../../../redux/slices/fundraise";
import countries from "./countries";
import FundraiseFooter from "./FundraiseFooter";
import { CATEGORIES } from "src/utils/constants";
import ReactCountryFlag from "react-country-flag";
import fakeRequest from "../../../utils/fakeRequest";
import { UploadSingleFileOverride } from "../../upload";
import FundraisePhotoEditor from "./FundraisePhotoEditor";
import { varFadeInRight, varFadeInUp } from "../../animate";
import { useDispatch, useSelector } from "../../../redux/store";

// ----------------------------------------------------------------------

const fundraiserSettings = [
  {
    name: "allowComment",
    label: "Allow donors to leave comments on my fundraisers",
  },
  { name: "allowDonation", label: "Allow donations to my fundraiser" },
  {
    name: "allowSearch",
    label: "Allow my fundraiser to appear in search results",
  },
];

FundraiseEditOverView.propTypes = {
  childRef: PropTypes.object,
  post: PropTypes.object,
};

export default function FundraiseEditOverView({ post, childRef }) {
  const theme = useTheme();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const isLight = theme.palette.mode === "light";

  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    goal: Yup.number().min(1000).required("This is required"),
    live: Yup.string().required("This is required"),
    category: Yup.string().required("This is required"),
    link: Yup.string(),
    allowComment: Yup.bool(),
    allowDonation: Yup.bool(),
    allowSearch: Yup.bool(),
  });

  const formik = useFormik({
    initialValues: {
      uid: post.uid,
      title: post.title,
      goal: post.goal,
      live: post.live.label,
      category: post.category,
      link: post.link,
      allowComment: post.allows.allowComment,
      allowDonation: post.allows.allowDonation,
      allowSearch: post.allows.allowSearch,
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await fakeRequest(500);
        // resetForm();
        await dispatch(
          updatePost({
            uid: values.uid,
            title: values.title,
            goal: values.goal,
            category: values.category,
            live: _.filter(countries, (item) => item.label === values.live)[0],
            link: values.link,
            allows: {
              allowComment: values.allowComment,
              allowDonation: values.allowDonation,
              allowSearch: values.allowSearch,
            },
          })
        );
        setSubmitting(false);
        enqueueSnackbar("Save success", { variant: "success" });
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
    isValid,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    getFieldProps,
    handleChange,
  } = formik;

  useEffect(() => {
    childRef.current = formik;
  }, [formik]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
            <Stack spacing={theme.shape.MAIN_SPACING}>
              <TextField
                fullWidth
                size="small"
                label="Fundraiser title?"
                {...getFieldProps("title")}
                error={Boolean(touched.title && errors.title)}
                helperText={touched.title && errors.title}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </Stack>
            <Grid container xs={12}>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  pr: {
                    xs: 0,
                    md: theme.shape.CARD_CONTENT_SPACING,
                  },
                  mb: {
                    md: 0,
                    xs: theme.shape.CARD_CONTENT_SPACING,
                  },
                }}
              >
                <Stack spacing={theme.shape.MAIN_SPACING}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Goal"
                    {...getFieldProps("goal")}
                    error={Boolean(touched.goal && errors.goal)}
                    helperText={touched.goal && errors.goal}
                    onFocus={(e) => {
                      e.target.select();
                    }}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
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
                            $
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                    varia
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={theme.shape.MAIN_SPACING}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Category"
                    {...getFieldProps("category")}
                    error={Boolean(touched.category && errors.category)}
                    helperText={touched.category && errors.category}
                    select
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  >
                    {_.orderBy(
                      CATEGORIES,
                      [(item) => item.toLowerCase()],
                      ["asc"]
                    ).map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              </Grid>
            </Grid>
            <Grid container xs={12}>
              <Grid item xs={12} md={6}>
                <Stack spacing={theme.shape.MAIN_SPACING}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Country"
                    {...getFieldProps("live")}
                    error={Boolean(touched.live && errors.live)}
                    helperText={touched.live && errors.live}
                    select
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  >
                    {countries.map((option) => (
                      <MenuItem key={option.code} value={option.label}>
                        <ReactCountryFlag
                          key={option.label}
                          countryCode={option.code}
                          svg
                          style={{
                            marginRight: 10,
                          }}
                        />
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              </Grid>
            </Grid>
            <Stack spacing={theme.shape.MAIN_SPACING}>
              <motion.div variants={varFadeInUp}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#A1A1A1",
                    ...(!isLight && {
                      textShadow: (theme) =>
                        `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`,
                    }),
                  }}
                >
                  This linked can only be changed once.Changing it will not
                  break your previous one.
                </Typography>
              </motion.div>

              <TextField
                fullWidth
                size="small"
                label=" Fundraiser Link"
                {...getFieldProps("link")}
                error={Boolean(touched.link && errors.link)}
                helperText={touched.link && errors.link}
                onChange={(e) => {
                  handleChange(e);
                }}
              />

              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.primary.main,
                }}
              >
                {`Preview: ${window.location.origin}/${values.link}`}
              </Typography>
            </Stack>

            <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
              <Typography
                variant="subtitle1"
                sx={{
                  ...(!isLight && {
                    textShadow: (theme) =>
                      `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`,
                  }),
                }}
              >
                Fundraiser Settings
              </Typography>

              {fundraiserSettings.map((item) => (
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent={"space-between"}
                >
                  <Typography variant="subtitle2" noWrap>
                    {item.label}
                  </Typography>

                  <Checkbox
                    disableRipple
                    checked={values[item.name]}
                    icon={<Icon icon={radioButtonOffOutline} />}
                    checkedIcon={<Icon icon={checkmarkCircle2Outline} />}
                    {...getFieldProps(item.name)}
                    onChange={(e) => {
                      setFieldValue(item.name, e.target.checked);
                    }}
                  />
                </Stack>
              ))}

              <Typography
                variant="body2"
                sx={{
                  color: "#A1A1A1",
                  ...(!isLight && {
                    textShadow: (theme) =>
                      `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`,
                  }),
                }}
              >
                Your fundraiser will appear in GoHelp search result and other
                online search engines.(If this is turned off, people will still
                be able to view your fundraiser if they have the link.)
              </Typography>
            </Stack>
          </Stack>
        </Form>
      </FormikProvider>

      <FundraisePhotoEditor formik={formik} open={open} onClose={handleClose} />
    </>
  );
}
