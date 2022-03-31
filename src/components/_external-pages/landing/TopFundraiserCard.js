import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { paramCase } from "change-case";
import eyeFill from "@iconify/icons-eva/eye-fill";
import _ from "lodash";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import moment from "moment";
import { alpha, experimentalStyled as styled } from "@material-ui/core/styles";
import {
  Box,
  Link,
  Card,
  Grid,
  Stack,
  Button,
  Typography,
  CardContent,
} from "@material-ui/core";
import { PATH_DASHBOARD, PATH_PAGE } from "../../../routes/paths";
import { useDispatch, useSelector } from "../../../redux/store";
import { fDate } from "../../../utils/formatTime";
import { fShortenNumber } from "../../../utils/formatNumber";
import SvgIconStyle from "../../SvgIconStyle";
import {
  varFadeIn,
  varFadeInUp,
  varWrapEnter,
  varFadeInRight,
} from "../../animate";
import DonateProgress from "../../DonateProgress";
import { fNumber, fCurrency, fPercent } from "../../../utils/formatNumber";
import { filters } from "../../../utils/constants";
import { useEffect, useState } from "react";
import { getDonate, getDonatesById } from "src/redux/slices/donate";
import ReactQuill from "react-quill";
import ReactCountryFlag from "react-country-flag";

// ----------------------------------------------------------------------

export const CARD_BRODER_RADIUS = 2;

export const CardContentStyle = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2, 2),
}));

export const CardMediaStyle = styled("div")({
  position: "relative",
  paddingTop: "calc(100% * 3 / 4)",
  overflow: "hidden",
});

export const CoverImgStyle = styled("img")(({ sx }) => ({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
  borderRadius: 8,
  ...sx,
}));

export const TitleStyle = styled(Typography)({
  overflow: "hidden",
  WebkitLineClamp: 1,
  display: "-webkit-box",
  // whiteSpace: "nowrap",
  WebkitBoxOrient: "vertical",
});

export const DescriptionStyle = styled(Typography)({
  height: 70,
  overflow: "hidden",
  WebkitLineClamp: 3,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
});

const CountryStyle = styled(Box)(({ theme }) => ({
  zIndex: 9,
  position: "absolute",
  left: theme.spacing(2),
  bottom: theme.spacing(2),
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  backgroundColor: "#333333",
  borderRadius: 8,
  padding: theme.spacing(0.75, 2),
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
  const navigate = useNavigate();
  const filter = filters(post.donates);
  const status = post.isDeleted ? "Deleted" : "Published";

  const handleNavigate = () => {
    simple
      ? navigate(`${PATH_PAGE.fundraiseDetails}/${post.id}`)
      : navigate(`${PATH_PAGE.donate}/${post.id}`);
  };

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ position: "relative" }}>
        <CardContentStyle>
          <Box sx={{ cursor: "pointer" }} onClick={handleNavigate}>
            <Stack>
              <CardMediaStyle>
                {!_.isEmpty(post.live) && !simple && (
                  <CountryStyle>
                    <ReactCountryFlag
                      countryCode={post.live.code}
                      svg
                      style={{
                        marginRight: 10,
                      }}
                    />
                    <Typography
                      variant="subtitle1"
                      sx={{
                        display: "block",
                        color: (theme) => theme.palette.common.white,
                      }}
                    >
                      {post.live.label}
                    </Typography>
                  </CountryStyle>
                )}

                {simple && <PublishButtonStyle>{status}</PublishButtonStyle>}

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

              <Stack spacing={0} sx={{ my: 1 }}>
                <TitleStyle color="inherit" variant="subtitle1">
                  {post.title}
                </TitleStyle>

                {/* {!simple && (
                  <DescriptionStyle color="inherit" variant="body1">
                    {post.description.text}
                  </DescriptionStyle>
                )} */}
              </Stack>

              <DonateProgress
                time={filter.recentTimeAgo}
                total={filter.totalAmount}
                goal={post.goal}
              />
            </Stack>
          </Box>

          {/* <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              mt: 2,
            }}
          >
            <motion.div variants={varFadeInRight}>
              <Button
                variant="contained"
                component={RouterLink}
                to={`${PATH_PAGE.donate}/${post.id}`}
              >
                {simple ? "Manage" : "Donate"}
              </Button>
            </motion.div>
          </Box> */}
        </CardContentStyle>
      </Card>
    </Grid>
  );
}
