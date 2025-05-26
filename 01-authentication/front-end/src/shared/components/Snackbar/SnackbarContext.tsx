import React, { createContext, useContext, useState, useCallback } from "react";
import { Snackbar, type SnackbarType } from "./Snackbar";

interface SnackbarContextType {
  showSnackbar: (
    message: string,
    type?: SnackbarType,
    position?: "top" | "bottom"
  ) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

interface SnackbarProviderProps {
  children: React.ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<SnackbarType>("info");
  const [position, setPosition] = useState<"top" | "bottom">("bottom");

  const showSnackbar = useCallback(
    (
      message: string,
      type: SnackbarType = "info",
      position: "top" | "bottom" = "bottom"
    ) => {
      setMessage(message);
      setType(type);
      setPosition(position);
      setOpen(true);
    },
    []
  );

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={open}
        message={message}
        type={type}
        position={position}
        onClose={handleClose}
      />
    </SnackbarContext.Provider>
  );
};
