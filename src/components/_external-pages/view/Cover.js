import { useTheme } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import {
  CardMediaStyle,
  CoverImgStyle,
} from "../../../components/custom-component/CommonStyles";
import { useDispatch, useSelector } from "../../../redux/store";

// ----------------------------------------------------------------------

export default function Cover() {
  const theme = useTheme();
  const { post } = useSelector((state) => state.fundraise);

  return (
    <Card sx={{ position: "relative" }}>
      <CardMediaStyle>
        <CoverImgStyle
          alt={"cover"}
          src={post.cover.preview}
          sx={{
            transform: `rotate(${
              ((-1 * post.cover.rotate) % 4) * 90
            }deg) scale(${1 + post.cover.scale / 100})`,
          }}
        />
      </CardMediaStyle>
    </Card>
  );
}
