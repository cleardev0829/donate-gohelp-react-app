import { isString } from "lodash";
import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";
// material
import { alpha, experimentalStyled as styled } from "@material-ui/core/styles";
import { Stack, Paper, Box, Typography } from "@material-ui/core";
// utils
import { fData } from "../../utils/formatNumber";
//
import { UploadIllustration } from "../../assets";

// ----------------------------------------------------------------------

const ImgStyle = styled("img")({
  width: 60,
  height: 60,
});

const DropZoneStyle = styled("div")(({ theme }) => ({
  outline: "none",
  display: "flex",
  overflow: "hidden",
  textAlign: "center",
  position: "relative",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(2, 0),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create("padding"),
  backgroundColor: theme.palette.background.paper,
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  "&:hover": {
    opacity: 0.72,
    cursor: "pointer",
  },
  [theme.breakpoints.up("md")]: { textAlign: "left", flexDirection: "row" },
}));

// ----------------------------------------------------------------------

UploadSingleFile.propTypes = {
  error: PropTypes.bool,
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  sx: PropTypes.object,
};

export default function UploadSingleFile({ error, file, sx, ...other }) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    multiple: false,
    ...other,
  });

  const ShowRejectionItems = () => (
    <Paper
      variant="outlined"
      sx={{
        py: 1,
        px: 2,
        mt: 3,
        borderColor: "error.light",
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
      }}
    >
      {fileRejections.map(({ file, errors }) => {
        const { path, size } = file;
        return (
          <Box key={path} sx={{ my: 1 }}>
            <Typography variant="subtitle2" noWrap>
              {path} - {fData(size)}
            </Typography>
            {errors.map((e) => (
              <Typography key={e.code} variant="caption" component="p">
                - {e.message}
              </Typography>
            ))}
          </Box>
        );
      })}
    </Paper>
  );

  return (
    <Box sx={{ width: "100%", ...sx }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: "error.main",
            borderColor: "error.light",
            bgcolor: "error.lighter",
          }),
          ...(file && { padding: "12% 0" }),
        }}
      >
        <input {...getInputProps()} />

        {/* <UploadIllustration sx={{ width: 220 }} /> */}

        <Stack spacing={2} alignItems="center">
          <ImgStyle src="/static/home/paste.png" />

          <Box sx={{ px: 6, ml: { md: 2 }, textAlign: "center" }}>
            <Stack spacing={2} justifyContent="space-between">
              <Typography gutterBottom variant="p1">
                Drop or drop an image, or &nbsp;
                <Typography
                  variant="p1"
                  component="span"
                  sx={{ color: "primary.main" }}
                >
                  browse
                </Typography>
              </Typography>

              <Typography variant="body1">
                A high-quality photo or video will help tell your story and
                build trust with donors.
              </Typography>
            </Stack>
          </Box>
        </Stack>

        {file && (
          <Box
            component="img"
            alt="file preview"
            src={isString(file) ? file : file.preview}
            sx={{
              top: 8,
              borderRadius: 1,
              objectFit: "cover",
              position: "absolute",
              width: "calc(100% - 16px)",
              height: "calc(100% - 16px)",
            }}
          />
        )}
      </DropZoneStyle>

      {fileRejections.length > 0 && <ShowRejectionItems />}
    </Box>
  );
}
