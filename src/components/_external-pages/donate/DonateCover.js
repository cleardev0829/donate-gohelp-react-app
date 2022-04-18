import { useState } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { capitalCase } from "change-case";
import shareFill from "@iconify/icons-eva/share-fill";
// material
import {
  Box,
  Tab,
  Tabs,
  Stack,
  Button,
  Divider,
  IconButton,
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
import DonateDialog from "./DonateDialog";
import { diff } from "../../../utils/constants";
import OutlineCard from "../../custom-component/OutlineCard";
import { useDispatch, useSelector } from "../../../redux/store";
import FundraiseShareDialog from "../fundraise/FundraiseShareDialog";
import {
  CardMediaStyle,
  CoverImgStyle,
} from "src/components/custom-component/CommonStyles";
import FullScreenButton from "src/components/custom-component/FullScreenButton";

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
    // minHeight: 200,
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

DonateCover.propTypes = {};

export default function DonateCover() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("Story");
  const { post } = useSelector((state) => state.donate);
  const [donateDlgOpen, setDonateDlgOpen] = useState(false);

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

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(close);
  };

  const handleDonateDlgOpen = () => {
    setDonateDlgOpen(true);
  };

  const handleDonateDlgClose = () => {
    setDonateDlgOpen(false);
  };

  return (
    <>
      <OutlineCard>
        <CardContent>
          <Stack direction="row" justifyContent={"space-between"}>
            <FullScreenButton elementId="cover" />
            <Stack
              spacing={theme.shape.CARD_CONTENT_SPACING}
              direction="row"
              justifyContent={"flex-end"}
              alignItems="center"
            >
              <IconButton onClick={handleDonateDlgOpen}>
                <Icon icon="carbon:wallet" width={20} height={20} />
              </IconButton>
              <IconButton onClick={handleOpen}>
                <Icon icon="carbon:share" width={20} height={20} />
              </IconButton>
            </Stack>
          </Stack>
        </CardContent>
        <Divider />
        <div id="cover">
          <CardMediaStyle>
            <CoverImgStyle
              alt="cover"
              src={post.cover.preview}
              sx={{
                transform: `rotate(${
                  ((-1 * post.cover.rotate) % 4) * 90
                }deg) scale(${1 + post.cover.scale / 100})`,
              }}
            />
          </CardMediaStyle>
        </div>
      </OutlineCard>

      <FundraiseShareDialog post={post} open={open} onClose={handleClose} />
      <DonateDialog
        post={post}
        open={donateDlgOpen}
        onClose={handleDonateDlgClose}
      />
    </>
  );
}
