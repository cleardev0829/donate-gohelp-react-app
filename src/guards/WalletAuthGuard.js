import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useMoralis } from "react-moralis";
// hooks
import useAuth from "../hooks/useAuth";
// routes
import { PATH_DASHBOARD, PATH_ONLY } from "../routes/paths";
import WalletDialog from "src/components/custom-component/WalletDialog";

// ----------------------------------------------------------------------

WalletAuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function WalletAuthGuard({ children }) {
  const [open, setOpen] = useState(false);
  const { isWeb3Enabled, isAuthenticated } = useMoralis();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!isWeb3Enabled || !isAuthenticated) {
    return (
      <>
        {children}
        <WalletDialog open={true} onClose={handleClose} />
      </>
    );
  }

  return <>{children}</>;
}
