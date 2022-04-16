import * as React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import WalletDialog from "./custom-component/WalletDialog";

ConnectButton.propTypes = {
  variant: PropTypes.string,
};

export function ConnectButton({ variant }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant={variant} onClick={handleOpen}>
        Connect
      </Button>
      <WalletDialog open={open} onClose={handleClose} />
    </>
  );
}
