import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#5B5FEF',
      light: '#8689F5',
      dark: '#3F42B8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#14B8A6',
      light: '#5EEAD4',
      dark: '#0F8F80',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F4F5FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1F2133',
      secondary: '#6B6E85',
    },
    pending: {
      main: '#F59E0B',
      light: '#FEF3C7',
      contrastText: '#7C4A03',
    },
    completed: {
      main: '#10B981',
      light: '#D1FAE5',
      contrastText: '#046C4E',
    },
    divider: '#E6E7F0',
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: "'Inter', system-ui, sans-serif",
    h4: {
      fontFamily: "'Poppins', system-ui, sans-serif",
      fontWeight: 700,
      letterSpacing: '-0.5px',
    },
    h5: {
      fontFamily: "'Poppins', system-ui, sans-serif",
      fontWeight: 600,
    },
    h6: {
      fontFamily: "'Poppins', system-ui, sans-serif",
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(31, 33, 51, 0.06)',
          border: '1px solid #EEEFF6',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
        contained: {
          boxShadow: '0 4px 12px rgba(91, 95, 239, 0.25)',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
        input: {
          color: '#1A1A1A',
          fontWeight: 500,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;
