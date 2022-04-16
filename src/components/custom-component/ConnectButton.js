import * as React from "react";
import { NavLink as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { MHidden } from "../@material-extend";
import { Button, IconButton } from "@material-ui/core";
import WalletDialog from "./WalletDialog";
import { PATH_AUTH, PATH_PAGE } from "../../routes/paths";
import { ConnectTextStyle } from "./CommonStyles";

ConnectButton.propTypes = {
  variant: PropTypes.string,
};

export default function ConnectButton({ variant }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MHidden width="mdDown">
        <ConnectTextStyle variant={variant} onClick={handleOpen}>
          Connect
        </ConnectTextStyle>
      </MHidden>

      <MHidden width="mdUp">
        <IconButton>
          <Icon icon="carbon:wallet" width={20} height={20} />
        </IconButton>
      </MHidden>

      <WalletDialog open={open} onClose={handleClose} />
    </>
  );
}
