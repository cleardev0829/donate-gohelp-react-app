import { useCallback, useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import _ from "lodash";
import moment from "moment";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { alpha, useTheme } from "@material-ui/core/styles";
import { Stack, Button, Typography } from "@material-ui/core";
import {
  varFadeIn,
  varFadeInUp,
  varWrapEnter,
  varFadeInRight,
} from "../../../components/animate";
import {
  FundraiseEditDialog,
  FundraiseShareDialog,
  FundraiseUpdateDialog,
} from "../../../components/_external-pages/fundraise";
import { PATH_PAGE } from "../../../routes/paths";
import { diff, filters } from "../../../utils/constants";
import { useDispatch, useSelector } from "../../../redux/store";
import DonateProgress from "../../../components/custom-component/DonateProgress";

// ----------------------------------------------------------------------

export default function Main() {
  const theme = useTheme();
  const params = useParams();
  const isLight = theme.palette.mode === "light";
  const [openEdit, setOpenEdit] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const { post } = useSelector((state) => state.fundraise);
  const [filter, setFilter] = useState(filters(post.donates));

  const handleOpenShare = () => {
    setOpenShare(true);
  };

  const handleCloseShare = () => {
    setOpenShare(false);
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  return (
    <>
      <Stack
        spacing={theme.shape.CARD_CONTENT_SPACING}
        justifyContent="space-between"
        sx={{ height: "100%", py: theme.shape.MAIN_VERTICAL_SPACING }}
      >
        <Typography
          variant="h5"
          sx={{
            ...(!isLight && {
              textShadow: (theme) =>
                `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`,
            }),
          }}
        >
          {post.title}
        </Typography>

        <Stack direction="row" justifyContent="space-between">
          <motion.div variants={varFadeInRight}>
            <Button
              variant="outlined"
              startIcon={<Icon icon="akar-icons:edit" />}
              onClick={handleOpenEdit}
            >
              Edit and settings
            </Button>
          </motion.div>
          <motion.div variants={varFadeInRight}>
            <Button
              variant="outlined"
              component={RouterLink}
              to={`${PATH_PAGE.donate}/${params.id}`}
              startIcon={<Icon icon="akar-icons:eye" />}
            >
              View fundraiser
            </Button>
          </motion.div>
        </Stack>

        <DonateProgress
          time={diff(moment(), moment(post.createdAt))}
          total={filter.totalAmount}
          goal={parseFloat(post.goal)}
        />
      </Stack>

      <FundraiseShareDialog
        post={post}
        open={openShare}
        onClose={handleCloseShare}
      />

      <FundraiseEditDialog
        uid={post.uid}
        open={openEdit}
        onClose={handleCloseEdit}
      />
    </>
  );
}
