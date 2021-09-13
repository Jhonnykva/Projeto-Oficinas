import { makeStyles } from '@material-ui/core';
import getMainStyle from './getMainStyle';

const getLoginStyle = (theme) => {
  const main = getMainStyle(theme);
  const login = makeStyles({
    loginPage: {
      height: '100vh',
      width: '100vw',
      display: 'flex',
      background: 'orange',
    },
    loginContainer: {
      width: '30rem',
      margin: 'auto auto',
      background: '#FFF',
      transition: 'all 500ms',
    },
    loginTitle: {
      display: 'block',
      fontWeight: 'bold',
      fontSize: '1.5rem',
      marginBottom: '.5rem',
    },
    loginItem: {
      marginTop: '0.5rem',
    },
    loginFooter: {
      marginTop: '1rem',
      textAlign: 'center',
      fontSize: '0.75rem',
    },
    loginFooterVital: {
      textAlign: 'center',
      fontSize: '0.75rem',
    },
    loginProgressBar: {
      marginTop: '1rem',
    },
  });
  return { ...main(), ...login() };
};
export default getLoginStyle;
