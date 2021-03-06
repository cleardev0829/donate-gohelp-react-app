import * as React from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { useWallet } from "use-wallet";
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
  DialogActions,
} from "@material-ui/core";
import toast from "react-hot-toast";

WalletDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default function WalletDialog({ open, onClose }) {
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
          <ListItem
            autoFocus
            button
            onClick={() => handleConnect({ type: "sol" })}
          >
            <ListItemAvatar>
              <Avatar src="/static/metamask/logo-phantom.jpg" />
            </ListItemAvatar>
            <ListItemText primary="Phantom" />
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDisconnect} disabled={!isAuthenticated}>
          Disconnect
        </Button>
      </DialogActions>
    </Dialog>
  );
}
