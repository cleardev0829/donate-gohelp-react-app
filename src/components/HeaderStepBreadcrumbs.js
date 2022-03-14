import { isString } from "lodash";
import PropTypes from "prop-types";
import { Box, Link, Stack } from "@material-ui/core";

// ----------------------------------------------------------------------

HeaderStepBreadcrumbs.propTypes = {
  links: PropTypes.array,
  cancelAction: PropTypes.node,
  continueAction: PropTypes.node,
  heading: PropTypes.string.isRequired,
  moreLink: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  sx: PropTypes.object,
};

export default function HeaderStepBreadcrumbs({
  links,
  cancelAction,
  continueAction,
  heading,
  moreLink = "" || [],
  sx,
  ...other
}) {
  return (
    <Stack sx={sx} mb={2} spacing={2}>
      <Stack direction="row" alignItems="center">
        <Box sx={{ flexGrow: 1 }}>
          {cancelAction && <Box sx={{ flexShrink: 0 }}>{cancelAction}</Box>}
        </Box>

        {continueAction && <Box sx={{ flexShrink: 0 }}>{continueAction}</Box>}
      </Stack>

      {isString(moreLink) ? (
        <Link href={moreLink} target="_blank" variant="body2">
          {moreLink}
        </Link>
      ) : (
        moreLink.map((href) => (
          <Link
            noWrap
            key={href}
            href={href}
            variant="body2"
            target="_blank"
            sx={{ display: "flex" }}
          >
            {href}
          </Link>
        ))
      )}
    </Stack>
  );
}
