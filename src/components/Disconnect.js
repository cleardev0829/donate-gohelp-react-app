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

Disconnect.propTypes = {
  variant: PropTypes.string,
};

export default function Disconnect({ variant, sx }) {
  const wallet = useWallet();
  const {
    Moralis,
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
    logout,
  } = useMoralis();

  const handleDisconnect = async () => {
    const toastId = toast.loading("Disconnectng");
    await logout();
    toast.success("Disconnected", { id: toastId });
  };

  return (
    <Button variant={variant} onClick={handleDisconnect}>
      Disconnect
    </Button>
  );
}
