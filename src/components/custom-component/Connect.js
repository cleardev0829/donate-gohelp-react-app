import { ConnectionRejectedError, useWallet } from "use-wallet";
import * as React from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import {
  List,
  Dialog,
  Button,
  Avatar,
  ListItem,
  DialogTitle,
  ListItemText,
  DialogContent,
  ListItemAvatar,
} from "@material-ui/core";
import toast from "react-hot-toast";
import useConnect from "src/hooks/useOffSetTop";
import { HoverTextStyle } from "./CommonStyles";

function SimpleDialog(props) {
  const wallet = useWallet();
  const activate = (connector) => wallet.connect(connector);

  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = async (value) => {
    const toastId = toast.loading("Loading");
    try {
      await activate(value);
      toast.success("Connected", { id: toastId });
      onClose();
    } catch (e) {
      console.error(e);
      const errorMessage = e?.message || "Error";
      toast.error(errorMessage, { id: toastId });
    }
  };
  const handleReset = () => {
    wallet.reset();
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle id="alert-dialog-title">Connect Wallet</DialogTitle>
      <DialogContent style={{ paddingBottom: 0 }}>
        <List sx={{ pt: 0 }}>
          <ListItem
            autoFocus
            button
            onClick={() => handleListItemClick("injected")}
          >
            <ListItemAvatar>
              <Avatar>
                <Icon icon="logos:metamask-icon" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Metamask" />
          </ListItem>
          <ListItem
            autoFocus
            button
            onClick={() => handleListItemClick("walletconnect")}
          >
            <ListItemAvatar>
              <Avatar src="/static/metamask/logo-walletconnect.svg" />
            </ListItemAvatar>
            <ListItemText primary="Wallet Connect" />
          </ListItem>
        </List>
      </DialogContent>
      <Button onClick={handleReset} sx={{ padding: "1rem" }}>
        Disconnect
      </Button>
    </Dialog>
  );
}

Connect.propTypes = {
  sx: PropTypes.object,
};

export default function Connect({ sx }) {
  const [open, setOpen] = React.useState(false);
  const wallet = useWallet();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <>
      <HoverTextStyle sx={sx} variant="subtitle2" onClick={handleClickOpen}>
        {wallet?.status === "connected" && wallet.account ? (
          <span>
            {wallet.account.slice(0, 3)}...
            {wallet.account.substr(wallet.account.length - 3)}
          </span>
        ) : (
          <span>Connect</span>
        )}
      </HoverTextStyle>
      <SimpleDialog open={open} onClose={handleClose} />
    </>
  );
}
