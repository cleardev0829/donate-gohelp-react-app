import PropTypes from "prop-types";
import { Box, Stack, Button } from "@material-ui/core";

// ----------------------------------------------------------------------

HeaderStepBreadcrumbs.propTypes = {
  type: PropTypes.string,
  cancelTitle: PropTypes.string,
  continueTitle: PropTypes.string,
  cancelButton: PropTypes.bool,
  cancelAction: PropTypes.func,
  continueAction: PropTypes.func,
  sx: PropTypes.object,
};

export default function HeaderStepBreadcrumbs({
  type,
  cancelTitle,
  continueTitle,
  cancelButton,
  cancelAction,
  continueAction,
  sx,
}) {
  return (
    <Stack sx={sx} mb={2} spacing={2}>
      <Stack direction="row" alignItems="center">
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ flexShrink: 0 }}>
            {cancelButton && (
              <Button variant="outlined" color="inherit" onClick={cancelAction}>
                {cancelTitle ? cancelTitle : "Back"}
              </Button>
            )}
          </Box>
        </Box>

        <Box sx={{ flexShrink: 0 }}>
          <Button
            type={type ? type : "submit"}
            variant="contained"
            onClick={continueAction}
          >
            {continueTitle ? continueTitle : "Continue"}
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
}
