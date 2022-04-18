import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import _ from "lodash";
import moment from "moment";
import numeral from "numeral";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import { Icon } from "@iconify/react";
import ReactCountryFlag from "react-country-flag";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import {
  alpha,
  useTheme,
  makeStyles,
  experimentalStyled as styled,
} from "@material-ui/core/styles";
import {
  Box,
  Card,
  Grid,
  Stack,
  Divider,
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
} from "src/components/custom-component/CommonStyles";
import MoreMenu from "./MoreMenu";
import DonateProgress from "../../custom-component/DonateProgress";
import { PATH_PAGE } from "../../../routes/paths";
import { filters } from "../../../utils/constants";
import { fNumber } from "../../../utils/formatNumber";
import { useDispatch, useSelector } from "../../../redux/store";
import Connect from "../../../components/custom-component/Connect";
import FundraiseShareDialog from "../fundraise/FundraiseShareDialog";
import { addFavorite, removeFavorite } from "../../../redux/slices/favorite";
import { resetPost, getPostsInitial } from "../../../redux/slices/fundraise";
import ConnectButton from "../../../components/custom-component/ConnectButton";

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

// ----------------------------------------------------------------------

TopFundraiserCard.propTypes = {
  post: PropTypes.object.isRequired,
  simple: PropTypes.bool,
};

export default function TopFundraiserCard({ post, simple = false }) {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, isWeb3Enabled, account } = useMoralis();
  const filter = filters(post.donates);
  const [open, setOpen] = useState(false);
  const [visibility, setVisivility] = useState("none");
  const status = post.isDeleted ? "Deleted" : "Published";
  const { index, step } = useSelector((state) => state.fundraise);

  const handleNavigate = async () => {
    dispatch(resetPost());
    simple
      ? navigate(`${PATH_PAGE.view}/${post.id}`)
      : navigate(`${PATH_PAGE.donate}/${post.id}`);
  };

  const handleFavorite = async () => {
    const favorite = _.find(post.favorites, (item) => item.account === account);
    if (favorite) {
      await dispatch(
        removeFavorite({
          ...favorite,
        })
      );
    } else {
      await dispatch(
        addFavorite({
          fundraiseId: post.id,
          account,
          favorite: true,
          createdAt: moment(),
        })
      );
    }
    dispatch(getPostsInitial(index, step));
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
          className={classes.root}
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
                  <CoverImgStyle
                    alt={"cover"}
                    src={post.cover.preview}
                    sx={{
                      transform: `rotate(${
                        ((-1 * post.cover.rotate) % 4) * 90
                      }deg) scale(${1 + post.cover.scale / 100})`,
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
                  goal={parseFloat(post.goal)}
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
                {simple && (
                  <ConnectTextStyle
                    variant="subtitle2"
                    color="primary"
                    sx={{ display: "visibility" }}
                  >
                    {status}
                  </ConnectTextStyle>
                )}

                {!simple && isAuthenticated && isWeb3Enabled && (
                  <ConnectTextStyle
                    variant="subtitle2"
                    color="primary"
                    component={RouterLink}
                    to={`${PATH_PAGE.donate}/${post.id}`}
                  >
                    Give
                  </ConnectTextStyle>
                )}

                {!simple && (!isAuthenticated || !isWeb3Enabled) && (
                  <ConnectButton variant="subtitle2" />
                )}
              </Box>
              <Stack direction="row" alignItems={"center"}>
                {_.find(post.favorites, (item) => item.account === account) && (
                  <Icon
                    icon="carbon:favorite-filled"
                    color={theme.palette.primary.main}
                    width={18}
                    height={18}
                  />
                )}
                <MoreMenu
                  uid={post.id}
                  onOpenShareDialog={handleOpenPreview}
                  handleFavorite={handleFavorite}
                />
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <FundraiseShareDialog
        post={post}
        open={open}
        onClose={handleClosePreview}
      />
    </>
  );
}
