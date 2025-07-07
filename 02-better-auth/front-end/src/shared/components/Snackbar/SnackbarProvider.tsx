import React, { useState, useCallback } from 'react';
import { Snackbar, type SnackbarType } from './Snackbar';
import { SnackbarContext } from './SnackbarContext';

interface SnackbarProviderProps {
  children: React.ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<SnackbarType>('info');
  const [position, setPosition] = useState<'top' | 'bottom'>('bottom');

  const showSnackbar = useCallback(
    (message: string, type: SnackbarType = 'info', position: 'top' | 'bottom' = 'bottom') => {
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
