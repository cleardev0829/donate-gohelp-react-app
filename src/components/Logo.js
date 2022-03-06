import PropTypes from "prop-types";
// material
import { useTheme } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object,
};

export default function Logo({ sx }) {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;

  return (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      {/* <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 512 512">
        <defs>
          <linearGradient id="BG1" x1="100%" x2="50%" y1="9.946%" y2="50%">
            <stop offset="0%" stopColor={PRIMARY_DARK} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG2" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG3" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
        </defs>
        <g fill={PRIMARY_MAIN} fillRule="evenodd" stroke="none" strokeWidth="1">
          <path
            fill="url(#BG1)"
            d="M183.168 285.573l-2.918 5.298-2.973 5.363-2.846 5.095-2.274 4.043-2.186 3.857-2.506 4.383-1.6 2.774-2.294 3.939-1.099 1.869-1.416 2.388-1.025 1.713-1.317 2.18-.95 1.558-1.514 2.447-.866 1.38-.833 1.312-.802 1.246-.77 1.18-.739 1.111-.935 1.38-.664.956-.425.6-.41.572-.59.8-.376.497-.537.69-.171.214c-10.76 13.37-22.496 23.493-36.93 29.334-30.346 14.262-68.07 14.929-97.202-2.704l72.347-124.682 2.8-1.72c49.257-29.326 73.08 1.117 94.02 40.927z"
          />
          <path
            fill="url(#BG2)"
            d="M444.31 229.726c-46.27-80.956-94.1-157.228-149.043-45.344-7.516 14.384-12.995 42.337-25.267 42.337v-.142c-12.272 0-17.75-27.953-25.265-42.337C189.79 72.356 141.96 148.628 95.69 229.584c-3.483 6.106-6.828 11.932-9.69 16.996 106.038-67.127 97.11 135.667 184 137.278V384c86.891-1.611 77.962-204.405 184-137.28-2.86-5.062-6.206-10.888-9.69-16.994"
          />
          <path
            fill="url(#BG3)"
            d="M450 384c26.509 0 48-21.491 48-48s-21.491-48-48-48-48 21.491-48 48 21.491 48 48 48"
          />
        </g>
      </svg> */}

      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        // xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="39px"
        height="39px"
        viewBox="0 0 39 39"
        enable-background="new 0 0 39 39"
        // xml:space="preserve"
      >
        <image
          id="image0"
          width="39"
          height="39"
          x="0"
          y="0"
          href="data:image/png;base64,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
AABJRU5ErkJggg=="
        />
      </svg>
    </Box>
  );
}
