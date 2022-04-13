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
import OutlineCard from "../../OutlineCard";
import { diff } from "../../../utils/constants";
import { useDispatch, useSelector } from "../../../redux/store";
import FundraiseShareDialog from "../fundraise/FundraiseShareDialog";
import { CardMediaStyle, CoverImgStyle } from "src/components/CommonStyles";
import SettingFullscreen from "src/components/settings/SettingFullscreen";
import FullScreenButton from "src/components/FullScreenButton";

// ----------------------------------------------------------------------

const HeroStyle = styled("div")(({ theme }) => ({
  paddingTop: "56%",
  position: "relative",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  "&:before": {
    top: 0,
    content: "''",
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: alpha(theme.palette.grey[900], 0.72),
  },
}));

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

DonateUpdates.propTypes = {};

export default function DonateUpdates() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("Story");
  const [donateDlgOpen, setDonateDlgOpen] = useState(false);
  const { post, isLoading } = useSelector((state) => state.fundraise);

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
      <Box sx={{ py: 3 }}>
        <Stack spacing={theme.shape.MAIN_VERTICAL_SPACING}>
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

          <OutlineCard>
            <Tabs
              value={currentTab}
              scrollButtons="auto"
              variant="scrollable"
              allowScrollButtonsMobile
              onChange={handleChangeTab}
            >
              {["Story", "Updates"].map((tab) => (
                <Tab
                  disableRipple
                  key={tab}
                  value={tab}
                  label={capitalCase(tab)}
                  sx={{ px: 3 }}
                />
              ))}
            </Tabs>
            <Divider />

            {currentTab === "Story" && (
              <CardContent>
                <QuillWrapperStyle>
                  <ReactQuill
                    readOnly
                    value={post.description.content}
                    modules={modules}
                    style={{
                      margin: 0,
                    }}
                  />
                </QuillWrapperStyle>
              </CardContent>
            )}

            {currentTab === "Updates" && (
              <>
                {/* <CardContent>
                  <Typography variant="h5">News from Fundraiser</Typography>
                </CardContent>

                <Divider /> */}

                {post.updates.map((update, index) => (
                  <Stack spacing={theme.shape.CARD_CONTENT_SPACING}>
                    <QuillWrapperStyle key={`quil-wrapper-${index}`}>
                      <ReactQuill
                        key={`react-quill-${index}`}
                        readOnly
                        value={update.description.content}
                        modules={modules}
                        style={{
                          margin: 0,
                        }}
                      />
                    </QuillWrapperStyle>
                    {update.cover && (
                      <CardContent>
                        <CardMediaStyle>
                          <CoverImgStyle
                            alt="cover"
                            src={update.cover.preview}
                            sx={{
                              transform: `rotate(${
                                ((-1 * update.cover.rotate) % 4) * 90
                              }deg) scale(${1 + update.cover.scale / 100})`,
                            }}
                          />
                        </CardMediaStyle>
                      </CardContent>
                    )}
                    {index < post.updates.length - 1 && (
                      <Divider key={`divider-${index}`} />
                    )}
                  </Stack>
                ))}
              </>
            )}
          </OutlineCard>
        </Stack>
      </Box>

      <FundraiseShareDialog post={post} open={open} onClose={handleClose} />
      <DonateDialog
        post={post}
        open={donateDlgOpen}
        onClose={handleDonateDlgClose}
      />
    </>
  );
}
