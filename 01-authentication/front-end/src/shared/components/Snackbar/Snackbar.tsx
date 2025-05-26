import React from "react";
import { styled } from "@mui/material/styles";
import { Snackbar as MuiSnackbar, Alert } from "@mui/material";

export type SnackbarType = "success" | "error" | "warning" | "info";

export interface SnackbarProps {
  open: boolean;
  message: string;
  type?: SnackbarType;
  position?: "top" | "bottom";
  onClose: () => void;
}

const StyledSnackbar = styled(MuiSnackbar)(() => ({
  "& .MuiAlert-root": {
    minWidth: "300px",
  },
}));

export const Snackbar: React.FC<SnackbarProps> = ({
  open,
  message,
  type = "info",
  position = "bottom",
  onClose,
}) => {
  return (
    <StyledSnackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{
        vertical: position,
        horizontal: "center",
      }}
    >
      <Alert variant="filled" onClose={onClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </StyledSnackbar>
  );
};
