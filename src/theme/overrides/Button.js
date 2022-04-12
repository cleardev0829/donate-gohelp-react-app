// ----------------------------------------------------------------------

export default function Button(theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            boxShadow: "none",
          },
          textTransform: "none",
        },
        sizeLarge: {
          height: 48,
        },
        containedInherit: {
          boxShadow: "-2px 4px 40px rgba(68, 68, 68, 0.08)",
          border: `1px solid ${theme.palette.background.paper}`,
          "&:hover": {
            backgroundColor: "rgba(27, 29, 31, 0.6)",
          },
        },
        containedPrimary: {
          boxShadow: theme.customShadows.button,
        },
        containedSecondary: {
          boxShadow: theme.customShadows.secondary,
        },
        outlinedInherit: {
          // border: `1px solid ${theme.palette.grey[500_32]}`,
          border: `1px solid #DADADA`,
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        },
        textInherit: {
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        },
      },
    },
  };
}
