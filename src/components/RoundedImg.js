import PropTypes from "prop-types";
import { alpha, experimentalStyled as styled } from "@material-ui/core/styles";

const CardMediaStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: 50,
}));

const ImgStyle = styled("img")({
  width: 60,
  height: 60,
});

RoundedImg.propTypes = {
  title: PropTypes.string,
  src: PropTypes.string,
  color: PropTypes.string,
};

export default function RoundedImg({ alt, src, color }) {
  return (
    <CardMediaStyle style={{ backgroundColor: color }}>
      <ImgStyle alt={alt} src={src} />
    </CardMediaStyle>
  );
}
