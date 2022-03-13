// ----------------------------------------------------------------------

export default function Tabs(theme) {
  return {
    MuiTab: {
      styleOverrides: {
        root: {
          padding: 0,
          fontWeight: theme.typography.fontWeightMedium,
          borderRadius: theme.shape.borderRadius,
          color: theme.palette.text.primary,
          "&.Mui-selected": {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.default,
          },
          "&:not(:last-child)": {
            marginRight: theme.spacing(2),
          },
          "@media (min-width: 600px)": {
            minWidth: 48,
          },
        },
        labelIcon: {
          minHeight: 48,
          paddingTop: 0,
          "& > .MuiTab-wrapper > *:first-of-type": {
            marginBottom: 0,
            marginRight: theme.spacing(1),
          },
        },
        wrapper: {
          flexDirection: "row",
          whiteSpace: "nowrap",
        },
        textColorInherit: {
          opacity: 1,
          color: theme.palette.text.secondary,
        },
      },
    },
    MuiTabPanel: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiTabScrollButton: {
      styleOverrides: {
        root: {
          width: 48,
          borderRadius: "50%",
        },
      },
    },
  };
}
