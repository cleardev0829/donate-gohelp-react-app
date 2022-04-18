import { useState } from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import { CardContent } from "@material-ui/core";
import {
  experimentalStyled as styled,
  useTheme,
} from "@material-ui/core/styles";
import {
  varFadeIn,
  varFadeInUp,
  varWrapEnter,
  varFadeInRight,
} from "../../animate";
import { useDispatch, useSelector } from "../../../redux/store";

// ----------------------------------------------------------------------

const QuillWrapperStyle = styled("div")(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  border: `solid 0px ${theme.palette.grey[500_32]}`,
  "& .ql-container.ql-snow": {
    borderColor: "transparent",
    ...theme.typography.body1,
    fontFamily: theme.typography.fontFamily,
  },
  "& .ql-editor": {
    // minHeight: 200,
    "&.ql-blank::before": {
      fontStyle: "normal",
      color: theme.palette.text.disabled,
    },
    "& pre.ql-syntax": {
      ...theme.typography.body2,
      padding: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.grey[900],
    },
  },
}));

DonateStory.propTypes = {};

export default function DonateStory() {
  const theme = useTheme();
  const { post } = useSelector((state) => state.donate);

  const modules = {
    toolbar: false,
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true,
    },
    syntax: true,
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <CardContent>
      <QuillWrapperStyle>
        <ReactQuill
          readOnly
          value={post.description.content}
          modules={modules}
          style={{
            margin: 0,
          }}
        />
      </QuillWrapperStyle>
    </CardContent>
  );
}
