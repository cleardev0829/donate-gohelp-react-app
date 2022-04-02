import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { paramCase } from "change-case";
import { useRef, useState } from "react";
import editFill from "@iconify/icons-eva/edit-fill";
import { Link as RouterLink } from "react-router-dom";
import trash2Outline from "@iconify/icons-eva/trash-2-outline";
import moreVerticalFill from "@iconify/icons-eva/more-vertical-fill";
import shareFill from "@iconify/icons-eva/share-fill";
import eyeFill from "@iconify/icons-eva/eye-fill";
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { PATH_PAGE } from "src/routes/paths";
// routes

// ----------------------------------------------------------------------

MoreMenu.propTypes = {
  uid: PropTypes.string,
  onOpenShareDialog: PropTypes.func,
  name: PropTypes.string,
};

export default function MoreMenu({ uid, onOpenShareDialog, name }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem sx={{ color: "text.secondary" }}>
          <ListItemIcon>
            <Icon icon="carbon:favorite-filled" width={18} height={18} />
          </ListItemIcon>
          <ListItemText
            primary="Favorite"
            primaryTypographyProps={{ variant: "h6" }}
          />
        </MenuItem>

        <MenuItem
          sx={{ color: "text.secondary" }}
          component={RouterLink}
          to={`${PATH_PAGE.fundraiseDetails}/${uid}`}
        >
          <ListItemIcon>
            <Icon icon={eyeFill} width={18} height={18} />
          </ListItemIcon>
          <ListItemText
            primary="View"
            primaryTypographyProps={{ variant: "h6" }}
          />
        </MenuItem>

        <MenuItem onClick={onOpenShareDialog} sx={{ color: "text.secondary" }}>
          <ListItemIcon>
            <Icon icon={shareFill} width={18} height={18} />
          </ListItemIcon>
          <ListItemText
            primary="Share"
            primaryTypographyProps={{ variant: "h6" }}
          />
        </MenuItem>
      </Menu>
    </>
  );
}
