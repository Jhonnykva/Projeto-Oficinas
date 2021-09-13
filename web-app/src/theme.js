import { createTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#ff9900',
    },
    secondary: {
      main: '#0066ff',
    },
    error: {
      main: '#A40000',
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;
