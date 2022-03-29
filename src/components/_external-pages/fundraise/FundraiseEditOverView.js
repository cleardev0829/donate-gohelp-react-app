import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useSnackbar } from "notistack";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "../../../redux/store";
import checkmarkCircle2Outline from "@iconify/icons-eva/checkmark-circle-2-outline";
import radioButtonOffOutline from "@iconify/icons-eva/radio-button-off-outline";
import * as Yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";
import {
  alpha,
  experimentalStyled as styled,
  useTheme,
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
import fakeRequest from "../../../utils/fakeRequest";
import {
  setCheckout,
  updatePost,
  getPostSuccess,
} from "../../../redux/slices/fundraise";
import { varFadeInRight, varFadeInUp } from "../../animate";
import { UploadSingleFileOverride } from "../../upload";
import FundraisePhotoEditor from "./FundraisePhotoEditor";
import { CATEGORIES } from "src/utils/constants";
import countries from "./countries";
import ReactCountryFlag from "react-country-flag";
import _ from "lodash";

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
  renderForm: PropTypes.func,
  post: PropTypes.object,
};

export default function FundraiseEditOverView({ renderForm, post }) {
  const theme = useTheme();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const isLight = theme.palette.mode === "light";
  const [open, setOpen] = useState(false);

  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.mixed().required("Title is required"),
    goal: Yup.number().min(1000).required("This is required"),
    live: Yup.string().required("This is required"),
    category: Yup.string().required("This is required"),
    link: Yup.string(),
    // name: Yup.string(),
    // cover: Yup.mixed(),
    allowComment: Yup.bool(),
    allowDonation: Yup.bool(),
    allowSearch: Yup.bool(),
  });

  const formik = useFormik({
    initialValues: {
      uid: post.uid,
      title: post.title,
      description: post.description,
      goal: post.goal,
      live: post.live.label,
      category: post.category,
      link: post.link,
      // name: post.team.name,
      // cover: { ...post.team.cover, touched: false },
      allowComment: post.allows.allowComment,
      allowDonation: post.allows.allowDonation,
      allowSearch: post.allows.allowSearch,
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await fakeRequest(500);
        resetForm();
        handleClosePreview();
        setSubmitting(false);
        dispatch(getPostSuccess(null));
        dispatch(
          updatePost({
            uid: values.uid,
            title: values.title,
            goal: values.goal,
            category: values.category,
            live: _.filter(countries, (item) => item.label === values.live)[0],
            link: values.link,
            // team: {
            //   name: values.name,
            //   cover: values.cover,
            // },
            allows: {
              allowComment: values.allowComment,
              allowDonation: values.allowDonation,
              allowSearch: values.allowSearch,
            },
          })
        );
        enqueueSnackbar("Save success", { variant: "success" });
        navigate(-1);
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

  useEffect(() => {
    renderForm(formik);
  }, [values]);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const cover = acceptedFiles[0];

      if (cover) {
        setFieldValue("cover", {
          ...cover,
          preview: URL.createObjectURL(cover),
          rotate: 0,
          scale: 0,
          touched: true,
        });
      }
    },
    [setFieldValue]
  );

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    handleOpenPreview();
  };

  const handleDelete = () => {
    setFieldValue("cover", null);
  };

  if (_.isEmpty(post)) {
    return null;
  }

  return (
    <>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
            <Stack spacing={theme.shape.MAIN_SPACING}>
              {/* <Typography
                variant="h5"
                sx={{
                  ...(!isLight && {
                    textShadow: (theme) =>
                      `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`,
                  }),
                }}
              >
                Fundraiser title?
              </Typography> */}

              <TextField
                fullWidth
                size="small"
                label="Fundraiser title?"
                {...getFieldProps("title")}
                error={Boolean(touched.title && errors.title)}
                helperText={touched.title && errors.title}
                onChange={(e) => {
                  dispatch(
                    setCheckout({
                      name: "title",
                      value: e.target.value,
                    })
                  );
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
                  {/* <Typography
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
                    Goal
                  </Typography> */}

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
                  {/* <Typography
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
                    Category
                  </Typography> */}

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
                  {/* <Typography
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
                    Country
                  </Typography> */}

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
              {/* <Typography
                variant="h5"
                sx={{
                  ...(!isLight && {
                    textShadow: (theme) =>
                      `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`,
                  }),
                }}
              >
                Fundraiser Link
              </Typography> */}

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

            {/* Team Setting */}
            {/* <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
              <Typography
                variant="h4"
                sx={{
                  ...(!isLight && {
                    textShadow: (theme) =>
                      `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`,
                  }),
                }}
              >
                Team Settings
              </Typography>

              <Stack spacing={theme.shape.MAIN_SPACING}>
                <Typography
                  variant="h5"
                  sx={{
                    ...(!isLight && {
                      textShadow: (theme) =>
                        `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`,
                    }),
                  }}
                >
                  Team Name
                </Typography>

                <TextField
                  fullWidth
                  size="small"
                  label=""
                  {...getFieldProps("name")}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                  onChange={(e) => {
                    dispatch(
                      setCheckout({
                        name: "name",
                        value: e.target.value,
                      })
                    );
                    handleChange(e);
                  }}
                />
              </Stack>

              <Stack spacing={theme.shape.MAIN_SPACING}>
                <Typography
                  variant="h5"
                  sx={{
                    ...(!isLight && {
                      textShadow: (theme) =>
                        `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`,
                    }),
                  }}
                >
                  Add team photo (Optional)
                </Typography>

                <div>
                  <UploadSingleFileOverride
                    maxSize={3145728}
                    accept="image/*"
                    file={values.cover}
                    onDrop={(acceptedFiles) => {
                      handleOpenPreview();
                      handleDrop(acceptedFiles);
                    }}
                    error={Boolean(touched.cover && errors.cover)}
                  />
                  {touched.cover && errors.cover && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {touched.cover && errors.cover}
                    </FormHelperText>
                  )}
                </div>

                <Stack direction="row" justifyContent="space-between">
                  <Button
                    size="middle"
                    type="button"
                    variant="outlined"
                    startIcon={<Icon icon="akar-icons:edit" />}
                    onClick={handleEdit}
                  >
                    Edit
                  </Button>
                  <Button
                    size="middle"
                    type="button"
                    variant="outlined"
                    startIcon={<Icon icon="bx:trash-alt" />}
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                </Stack>
              </Stack>

              <Typography
                variant="h5"
                paragraph
                sx={{
                  ...(!isLight && {
                    textShadow: (theme) =>
                      `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`,
                  }),
                }}
              >
                Show the amount each team member has raised publicly.
              </Typography>

              <Stack direction="row" justifyContent={"flex-end"}>
                <Button
                  size="middle"
                  type="button"
                  variant="contained"
                  color="error"
                  onClick={handleEdit}
                >
                  Delete Team
                </Button>
              </Stack>
            </Stack> */}

            {/* Fundraiser Settings */}
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

      <FundraisePhotoEditor
        formik={formik}
        openPreview={open}
        onClosePreview={handleClosePreview}
      />
    </>
  );
}
