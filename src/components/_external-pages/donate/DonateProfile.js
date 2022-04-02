import { useState } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
// material
import {
  Box,
  Card,
  Grid,
  Stack,
  Button,
  Typography,
  CardContent,
} from "@material-ui/core";
import {
  experimentalStyled as styled,
  useTheme,
} from "@material-ui/core/styles";
import {
  varFadeIn,
  varFadeInUp,
  varWrapEnter,
  varFadeInRight,
} from "../../animate";
import { diff } from "../../../utils/constants";
import { onNextStep } from "src/redux/slices/donate";
import OutlineCard from "src/components/OutlineCard";
import { useDispatch, useSelector } from "../../../redux/store";
import FundraiseShareDialog from "../fundraise/FundraiseShareDialog";
import { CardMediaStyle, CoverImgStyle } from "src/components/CommonStyles";

// ----------------------------------------------------------------------

const QuillWrapperStyle = styled("div")(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  border: `solid 0px ${theme.palette.grey[500_32]}`,
  "& .ql-container.ql-snow": {
    borderColor: "transparent",
    ...theme.typography.body1,
    fontFamily: theme.typography.fontFamily,
  },
  "& .ql-editor": {
    minHeight: 200,
    "&.ql-blank::before": {
      fontStyle: "normal",
      color: theme.palette.text.disabled,
    },
    "& pre.ql-syntax": {
      ...theme.typography.body2,
      padding: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.grey[900],
    },
  },
}));

DonateProfile.propTypes = {
  post: PropTypes.object,
};

export default function DonateProfile({ post }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { cover, title, description, createdAt, rotate, scale } = post;

  const modules = {
    toolbar: false,
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true,
    },
    syntax: true,
    clipboard: {
      matchVisual: false,
    },
  };

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const handleShare = () => {
    handleOpenPreview();
  };

  return (
    <>
      <Box sx={{ py: 3 }}>
        <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
          <Typography variant="h3">{title}</Typography>

          <Box sx={{ position: "relative" }}>
            <CardMediaStyle>
              <CoverImgStyle
                alt="cover"
                src={cover.preview}
                sx={{
                  transform: `rotate(${((-1 * rotate) % 4) * 90}deg) scale(${
                    1 + scale / 100
                  })`,
                }}
              />
            </CardMediaStyle>
          </Box>

          {/* <Typography variant="body2">{description}</Typography> */}

          <Stack direction="row" spacing={theme.shape.CARD_CONTENT_SPACING}>
            <motion.div variants={varFadeInRight}>
              <Button
                variant="outlined"
                color="inherit"
                // component={RouterLink}
                // to={PATH_PAGE.page404}
                startIcon={<Icon icon="iconoir:timer" />}
              >
                {`Created ${diff(moment(), moment(createdAt))}`}
              </Button>
            </motion.div>
            <motion.div variants={varFadeInRight}>
              <Button
                variant="outlined"
                color="inherit"
                // component={RouterLink}
                // to={PATH_PAGE.page404}
                startIcon={<Icon icon="akar-icons:ribbon" />}
              >
                Funerals & Memorials
              </Button>
            </motion.div>
          </Stack>

          <OutlineCard>
            <CardContent>
              <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
                <Typography variant="h5">
                  A few words from Fundraiser
                </Typography>

                <QuillWrapperStyle>
                  <ReactQuill
                    readOnly
                    value={description.text}
                    modules={modules}
                    style={{
                      margin: 0,
                    }}
                  />
                </QuillWrapperStyle>

                {/* <Typography variant="body2">{description}</Typography> */}
              </Stack>
            </CardContent>
          </OutlineCard>

          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={theme.shape.CARD_CONTENT_SPACING}
          >
            <Grid container spacing={theme.shape.CARD_CONTENT_SPACING}>
              <Grid item xs="12" md="6">
                <motion.div variants={varFadeInRight}>
                  <Button
                    fullWidth
                    variant="contained"
                    // component={RouterLink}
                    // to={PATH_PAGE.donate_payment}
                    onClick={() => dispatch(onNextStep())}
                  >
                    Donate Now
                  </Button>
                </motion.div>
              </Grid>
              <Grid item xs="12" md="6">
                <motion.div variants={varFadeInRight}>
                  <Button
                    fullWidth
                    variant="outlined"
                    // component={RouterLink}
                    // to={PATH_PAGE.page404}
                    onClick={handleShare}
                  >
                    Share
                  </Button>
                </motion.div>
              </Grid>
            </Grid>
          </Stack>
        </Stack>
      </Box>

      <FundraiseShareDialog
        uid={post.uid}
        title={post.title}
        openPreview={open}
        onClosePreview={handleClosePreview}
      />
    </>
  );
}
