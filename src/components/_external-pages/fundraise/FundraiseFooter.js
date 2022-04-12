import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Stack,
  Button,
  Container,
  DialogActions,
} from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";

FundraiseFooter.propTypes = {
  isLoading: PropTypes.bool,
  cancelTitle: PropTypes.string,
  continueTitle: PropTypes.string,
  cancelButton: PropTypes.bool,
  cancelAction: PropTypes.func,
  continueAction: PropTypes.func,
  sx: PropTypes.object,
};

export default function FundraiseFooter({
  isLoading = false,
  cancelTitle = "Back",
  continueTitle = "Continue",
  cancelButton = true,
  cancelAction,
  continueAction,
  sx,
}) {
  return (
    <Stack
      spacing={3}
      direction="row"
      justifyContent={"flex-end"}
      sx={{ paddingTop: (theme) => theme.spacing(3) }}
    >
      <Button variant="outlined" color="inherit" onClick={cancelAction}>
        {cancelTitle ? cancelTitle : "Back"}
      </Button>
      <LoadingButton
        variant="contained"
        onClick={continueAction}
        loading={isLoading}
      >
        {continueTitle ? continueTitle : "Continue"}
      </LoadingButton>
    </Stack>
  );
}
