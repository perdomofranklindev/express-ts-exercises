import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useColorScheme } from '@mui/material/styles';

export const ThemeToggle = () => {
  const { mode, setMode } = useColorScheme();

  return (
    <IconButton 
      onClick={() => setMode(mode === 'light' ? 'dark' : 'light')} 
      color="inherit"
    >
      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}; 