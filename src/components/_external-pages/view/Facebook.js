import { FacebookShareButton } from "react-share";
import {
  useTheme,
  experimentalStyled as styled,
} from "@material-ui/core/styles";
import { Card, Stack, Button, Typography } from "@material-ui/core";

// ----------------------------------------------------------------------

const FacebookImgStyle = styled("img")({
  width: 40,
  height: 40,
});

// ----------------------------------------------------------------------

export default function Facebook() {
  const theme = useTheme();

  return (
    <Card
      sx={{
        px: 1,
        py: 1.5,
        width: "100%",
        backgroundColor: (theme) => theme.palette.common.white,
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
      >
        <Stack spacing={2} direction="row" alignItems="center">
          <FacebookImgStyle
            alt="post cover"
            src="/static/socials/Facebook.png"
          />
          <Typography
            variant="body2"
            color={(theme) => theme.palette.common.black}
          >
            Dud you know? Sharing on Facebook can increase your donation as much
            as 350%
          </Typography>
        </Stack>

        <FacebookShareButton url={""}>
          <Button variant="contained">Share on Facebook</Button>
        </FacebookShareButton>
      </Stack>
    </Card>
  );
}
