import { useState } from "react";
import { Icon } from "@iconify/react";
import PropTypes from "prop-types";
import roundFullscreen from "@iconify/icons-ic/round-fullscreen";
import roundFullscreenExit from "@iconify/icons-ic/round-fullscreen-exit";
// material
import { alpha } from "@material-ui/core/styles";
import { Button, IconButton } from "@material-ui/core";

// ----------------------------------------------------------------------

FullScreenButton.propTypes = {
  elementId: PropTypes.string,
};

export default function FullScreenButton({ elementId }) {
  const [fullscreen, setFullscreen] = useState(false);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.getElementById(elementId).requestFullscreen();
      setFullscreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  return (
    <IconButton onClick={toggleFullScreen}>
      <Icon icon="cil:fullscreen" width={20} height={20} />
    </IconButton>
  );
}
