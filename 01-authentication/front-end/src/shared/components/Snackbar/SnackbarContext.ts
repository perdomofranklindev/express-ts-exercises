import { createContext } from 'react';
import type { SnackbarType } from './Snackbar';

interface SnackbarContextType {
  showSnackbar: (message: string, type?: SnackbarType, position?: 'top' | 'bottom') => void;
}

export const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);
