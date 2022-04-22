import { useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { useTheme } from "@material-ui/core/styles";
import { Stack, Divider, IconButton, CardContent } from "@material-ui/core";
import {
  varFadeIn,
  varFadeInUp,
  varWrapEnter,
  varFadeInRight,
} from "../../animate";
import {
  CardMediaStyle,
  CoverImgStyle,
} from "src/components/custom-component/CommonStyles";
import DonateDialog from "./DonateDialog";
import OutlineCard from "../../custom-component/OutlineCard";
import { useDispatch, useSelector } from "../../../redux/store";
import FundraiseShareDialog from "../fundraise/FundraiseShareDialog";
import FullScreenButton from "src/components/custom-component/FullScreenButton";

// ----------------------------------------------------------------------

DonateCover.propTypes = {};

export default function DonateCover() {
  const theme = useTheme();
  const { account } = useMoralis();
  const [open, setOpen] = useState(false);
  const { post } = useSelector((state) => state.donate);
  const [donateDlgOpen, setDonateDlgOpen] = useState(false);

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
              <IconButton
                component="a"
                href={`https://etherscan.io/address/${account}`}
                target="_blank"
              >
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
