import { useCallback, useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import _ from "lodash";
import moment from "moment";
import numeral from "numeral";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useSnackbar } from "notistack";
import { capitalCase } from "change-case";
import {
  alpha,
  useTheme,
  experimentalStyled as styled,
} from "@material-ui/core/styles";
import {
  Box,
  Tab,
  Tabs,
  Card,
  Grid,
  Stack,
  Button,
  Container,
  Typography,
} from "@material-ui/core";
import {
  varFadeIn,
  varFadeInUp,
  varWrapEnter,
  varFadeInRight,
} from "../../animate";
import {
  addPost,
  onBackStep,
  onNextStep,
} from "../../../redux/slices/fundraise";
import { FundraiseHeader } from ".";
import { PATH_PAGE } from "src/routes/paths";
import FundraiseFooter from "./FundraiseFooter";
import DonateProgress from "../../DonateProgress";
import { fNumber } from "../../../utils/formatNumber";
import { diff, filters } from "../../../utils/constants";
import { useDispatch, useSelector } from "../../../redux/store";
import { CardMediaStyle, CoverImgStyle } from "src/components/CommonStyles";

// ----------------------------------------------------------------------

FundraisePreview.propTypes = {
  onClose: PropTypes.func,
};

export default function FundraisePreview({ onClose }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const isLight = theme.palette.mode === "light";
  const [filter, setFilter] = useState(filters([]));
  const { checkout, isLoading } = useSelector((state) => state.fundraise);

  const handleBackStep = () => {
    dispatch(onBackStep());
  };

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const handleSubmit = async () => {
    await dispatch(
      addPost({
        ...checkout,
        createdAt: moment(),
      })
    );
    onClose();
    enqueueSnackbar("Save success", { variant: "success" });
    navigate(`${PATH_PAGE.view}/${checkout.uid}`);
  };

  return (
    <>
      <Grid container spacing={theme.shape.MAIN_HORIZONTAL_SPACING}>
        <Grid item xs={12} md={6}>
          <CardMediaStyle>
            {checkout.cover && (
              <CoverImgStyle
                alt={"cover"}
                src={checkout.cover.preview}
                sx={{
                  transform: `rotate(${
                    ((-1 * checkout.cover.rotate) % 4) * 90
                  }deg) scale(${1 + checkout.cover.scale / 100})`,
                }}
              />
            )}
          </CardMediaStyle>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack
            spacing={theme.shape.CARD_CONTENT_SPACING}
            justifyContent="space-between"
            sx={{ height: "100%" }}
          >
            <Stack direction="row" justifyContent="space-between">
              <motion.div variants={varFadeInRight}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.disabled",
                    ...(!isLight && {
                      textShadow: (theme) =>
                        `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`,
                    }),
                  }}
                >
                  Your location
                </Typography>
              </motion.div>
              <motion.div variants={varFadeInRight}>
                <Typography
                  variant="body2"
                  sx={{
                    ...(!isLight && {
                      textShadow: (theme) =>
                        `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`,
                    }),
                  }}
                >
                  {checkout.live && checkout.live.label}
                </Typography>
              </motion.div>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <motion.div variants={varFadeInRight}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.disabled",
                    ...(!isLight && {
                      textShadow: (theme) =>
                        `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`,
                    }),
                  }}
                >
                  Fundraising for
                </Typography>
              </motion.div>
              <motion.div variants={varFadeInRight}>
                <Typography
                  variant="body2"
                  sx={{
                    ...(!isLight && {
                      textShadow: (theme) =>
                        `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`,
                    }),
                  }}
                >
                  {checkout.category}
                </Typography>
              </motion.div>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <motion.div variants={varFadeInRight}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.disabled",
                    ...(!isLight && {
                      textShadow: (theme) =>
                        `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`,
                    }),
                  }}
                >
                  Amount
                </Typography>
              </motion.div>
              <motion.div variants={varFadeInRight}>
                <Typography
                  variant="body2"
                  sx={{
                    ...(!isLight && {
                      textShadow: (theme) =>
                        `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`,
                    }),
                  }}
                >
                  {checkout.goal}
                </Typography>
              </motion.div>
            </Stack>

            <DonateProgress
              time={diff(moment(), moment(checkout.createdAt))}
              total={filter.totalAmount}
              goal={parseFloat(checkout.goal)}
            />
          </Stack>
        </Grid>
      </Grid>
      <FundraiseFooter
        isLoading={isLoading}
        cancelAction={handleBackStep}
        continueAction={handleSubmit}
      />
    </>
  );
}
