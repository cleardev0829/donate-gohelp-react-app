import { useEffect, useState } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import ReactCountryFlag from "react-country-flag";
// material
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  alpha,
  useTheme,
  makeStyles,
  experimentalStyled as styled,
} from "@material-ui/core/styles";
import {
  Box,
  Link,
  Card,
  Grid,
  Stack,
  Avatar,
  Button,
  Divider,
  Typography,
  CardContent,
} from "@material-ui/core";
import {
  varFadeIn,
  varFadeInUp,
  varWrapEnter,
  varFadeInRight,
} from "../../animate";
import {
  TitleStyle,
  CoverImgStyle,
  CardMediaStyle,
  DescriptionStyle,
  ConnectTextStyle,
} from "src/components/CommonStyles";
import MoreMenu from "./MoreMenu";
import SvgIconStyle from "../../SvgIconStyle";
import { fDate } from "../../../utils/formatTime";
import DonateProgress from "../../DonateProgress";
import { PATH_PAGE } from "../../../routes/paths";
import { filters } from "../../../utils/constants";
import { useDispatch, useSelector } from "../../../redux/store";
import FundraiseShareDialog from "../fundraise/FundraiseShareDialog";

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    // boxShadow: theme.customShadows.z16,
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    zIndex: 0, // Fix Safari overflow: hidden with border radius

    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

const PublishButtonStyle = styled(Box)(({ theme }) => ({
  zIndex: 9,
  position: "absolute",
  left: theme.spacing(2),
  bottom: theme.spacing(2),
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  backgroundColor: theme.palette.primary.main,
  borderRadius: 8,
  padding: theme.spacing(0.75, 2),
}));

// ----------------------------------------------------------------------

TopFundraiserCard.propTypes = {
  post: PropTypes.object.isRequired,
  simple: PropTypes.bool,
};

export default function TopFundraiserCard({ post, simple = false }) {
  const theme = useTheme();
  const classes = useStyles();
  const navigate = useNavigate();
  const filter = filters(post.donates);
  const status = post.isDeleted ? "Deleted" : "Published";
  const [open, setOpen] = useState(false);
  const [visibility, setVisivility] = useState("none");

  const handleNavigate = () => {
    simple
      ? navigate(`${PATH_PAGE.fundraiseDetails}/${post.id}`)
      : navigate(`${PATH_PAGE.donate}/${post.id}`);
  };

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const handleMouseOver = () => {
    setVisivility("visivility");
  };

  const handleMouseOut = () => {
    setVisivility("none");
  };

  return (
    <>
      <Grid item xs={12} sm={6} md={3}>
        <Card
          class={classes.root}
          sx={{ position: "relative" }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <CardContent
            sx={{
              "&:last-child": {
                paddingBottom: 0.5,
              },
            }}
          >
            <Box sx={{ cursor: "pointer" }} onClick={handleNavigate}>
              <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
                <CardMediaStyle>
                  {/* {simple && <PublishButtonStyle>{status}</PublishButtonStyle>} */}

                  <CoverImgStyle
                    alt={"cover"}
                    src={post.cover.preview}
                    sx={{
                      transform: `rotate(${
                        ((-1 * post.rotate) % 4) * 90
                      }deg) scale(${1 + post.scale / 100})`,
                    }}
                  />
                </CardMediaStyle>

                <TitleStyle color="inherit" variant="subtitle1">
                  {post.title}
                </TitleStyle>

                <ReactCountryFlag
                  countryCode={post.live.code}
                  svg
                  style={{
                    margin: 0,
                    marginRight: 0,
                  }}
                />

                <DonateProgress
                  time={filter.recentTimeAgo}
                  total={filter.totalAmount}
                  goal={post.goal}
                />
              </Stack>
            </Box>
            <Divider sx={{ mt: theme.shape.CARD_CONTENT_SPACING, mb: 0.5 }} />
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={"space-between"}
            >
              <Box>
                {simple ? (
                  <ConnectTextStyle
                    variant="subtitle2"
                    color="primary"
                    sx={{ display: "visibility" }}
                  >
                    {status}
                  </ConnectTextStyle>
                ) : (
                  <ConnectTextStyle
                    variant="subtitle2"
                    color="primary"
                    sx={{ display: visibility }}
                  >
                    Connect
                  </ConnectTextStyle>
                )}
              </Box>
              <MoreMenu
                uid={post.id}
                onOpenShareDialog={handleOpenPreview}
                name={"name"}
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <FundraiseShareDialog
        uid={post.id}
        title={post.title}
        openPreview={open}
        onClosePreview={handleClosePreview}
      />
    </>
  );
}
