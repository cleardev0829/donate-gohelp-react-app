import * as React from "react";
import { NavLink as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { useMoralis } from "react-moralis";
import { MHidden } from "../@material-extend";
import { Button, IconButton } from "@material-ui/core";
import { PATH_AUTH, PATH_PAGE } from "../../routes/paths";

ProfileButton.propTypes = {
  variant: PropTypes.string,
};

export default function ProfileButton({ variant }) {
  const [open, setOpen] = React.useState(false);
  const { isWeb3Enabled, isAuthenticated, account } = useMoralis();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MHidden width="mdDown">
        <Button component={RouterLink} to={`${PATH_PAGE.profile}/${account}`}>
          Profile
        </Button>
      </MHidden>

      <MHidden width="mdUp">
        <IconButton
          component={RouterLink}
          to={`${PATH_PAGE.profile}/${account}`}
        >
          <Icon icon="gg:profile" width={24} height={24} />
        </IconButton>
      </MHidden>
    </>
  );
}
