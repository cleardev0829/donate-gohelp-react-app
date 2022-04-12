import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Container } from "@material-ui/core";
import HeaderStepBreadcrumbs from "../../HeaderStepBreadcrumbs";
import HeaderStep from "../../HeaderStep";

FundraiseHeader.propTypes = {
  cancelTitle: PropTypes.string,
  continueTitle: PropTypes.string,
  cancelButton: PropTypes.bool,
  cancelAction: PropTypes.func,
  continueAction: PropTypes.func,
  sx: PropTypes.object,
};

export default function FundraiseHeader({
  cancelTitle = "Back",
  continueTitle = "Continue",
  cancelButton = true,
  cancelAction,
  continueAction,
  sx,
}) {
  return (
    <>
      <Container maxWidth="lg">
        <HeaderStepBreadcrumbs
          cancelTitle={cancelTitle}
          continueTitle={continueTitle}
          cancelButton={cancelButton}
          cancelAction={cancelAction}
          continueAction={continueAction}
          sx={sx}
        />
      </Container>

      {/* <Container maxWidth="md">
        <HeaderStep />
      </Container> */}
    </>
  );
}
