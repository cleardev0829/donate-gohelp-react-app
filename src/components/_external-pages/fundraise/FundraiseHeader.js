import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Container } from "@material-ui/core";

import HeaderStepBreadcrumbs from "../../HeaderStepBreadcrumbs";
import HeaderStep from "../../HeaderStep";

HeaderStepBreadcrumbs.propTypes = {
  cancelAction: PropTypes.node,
  continueAction: PropTypes.node,
  sx: PropTypes.object,
  activeStep: PropTypes.number,
  isComplete: PropTypes.bool,
};

export default function FundraiseHeader({
  cancelTitle,
  continueTitle,
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
          cancelAction={cancelAction}
          continueAction={continueAction}
          sx={sx}
        />
      </Container>

      <Container maxWidth="md">
        <HeaderStep />
      </Container>
    </>
  );
}
