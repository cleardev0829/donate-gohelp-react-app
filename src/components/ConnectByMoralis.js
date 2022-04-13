import { ConnectionRejectedError, useWallet } from "use-wallet";
import * as React from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { useMoralis } from "react-moralis";
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
import { ConnectTextStyle } from "./CommonStyles";

function SimpleDialog(props) {
  const wallet = useWallet();
  const {
    Moralis,
    authenticate,
    isWeb3Enabled,
    isWeb3EnableLoading,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
    enableWeb3,
    logout,
  } = useMoralis();
  const { onClose, open, type } = props;

  const login = async (params) => {
    if (!isWeb3Enabled) {
      await enableWeb3({ ...params }).then((user) => {
        console.log("web3:", user);
      });
    } else if (!isAuthenticated) {
      await authenticate({ ...params })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleConnect = async (params) => {
    const toastId = toast.loading("Connecting");
    try {
      await login({ ...params });
      toast.success("Connected", { id: toastId });
      onClose();
    } catch (e) {
      console.error(e);
      const errorMessage = e?.message || "Error";
      toast.error(errorMessage, { id: toastId });
    }
  };

  const handleDisconnect = async () => {
    const toastId = toast.loading("Disconnectng");
    await logout();
    toast.success("Disconnected", { id: toastId });
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
            onClick={() =>
              handleConnect({ signingMessage: "Log in using Moralis" })
            }
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
            onClick={() => handleConnect({ provider: "walletconnect" })}
          >
            <ListItemAvatar>
              <Avatar src="/static/metamask/logo-walletconnect.svg" />
            </ListItemAvatar>
            <ListItemText primary="Wallet Connect" />
          </ListItem>
        </List>
      </DialogContent>
      <Button onClick={handleDisconnect} disabled={!isAuthenticated}>
        Disconnect
      </Button>
    </Dialog>
  );
}

ConnectByMoralis.propTypes = {
  variant: PropTypes.string,
  sx: PropTypes.object,
};

export function ConnectByMoralis({ variant, sx }) {
  const [open, setOpen] = React.useState(false);

  const handleConnectOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <>
      <Button variant={variant} onClick={handleConnectOpen}>
        Connect
      </Button>
      <SimpleDialog open={open} onClose={handleClose} />
    </>
  );
}
