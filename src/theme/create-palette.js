// createPalette file
import { common } from "@mui/material/colors";
import { alpha } from "@mui/material/styles";
import { error, indigo, info, neutral, success, warning } from "./colors";

export function createPalette(darkMode) {
  const textPrimary = darkMode ? common.white : neutral[900];
  const textSecondary = darkMode ? alpha(common.white, 0.7) : neutral[500];
  // const backgroundDefault = darkMode ? "#121212" : common.white;
  // const backgroundPaper = darkMode ? "#1E1E1E" : common.white;

  const backgroundDefault = darkMode ? "#0E1320" : common.white;
  const backgroundPaper = darkMode ? "#111927" : common.white;

  return {
    action: {
      active: neutral[500],
      disabled: alpha(neutral[900], 0.38),
      disabledBackground: alpha(neutral[900], 0.12),
      focus: alpha(neutral[900], 0.16),
      hover: alpha(neutral[900], 0.04),
      selected: alpha(neutral[900], 0.12),
    },
    background: {
      default: backgroundDefault,
      paper: backgroundPaper,
    },
    divider: darkMode ? "#616161" : "#F2F4F7",
    error,
    info,
    mode: darkMode ? "dark" : "light",
    neutral,
    primary: indigo,
    success,
    text: {
      primary: textPrimary,
      secondary: textSecondary,
      disabled: alpha(textPrimary, 0.38),
    },
    warning,
  };
}
