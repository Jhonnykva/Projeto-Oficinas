import { makeStyles } from '@material-ui/core';
import getMainStyle from './getMainStyle';

const getLoginStyle = (theme) => {
  const main = getMainStyle(theme);
  const login = makeStyles({
    errorIndicatorContainer: {
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
      paddingLeft: '0.75rem',
      paddingRight: '0.75rem',
      marginTop: '0.25rem',
      marginBottom: '0.25rem',
      borderRadius: '0.25rem',
      background: '#ff0000',
      boxShadow: '0px 0px 10px -3px rgba(0,0,0,0.25)',
    },
    errorIndicatorText: {
      color: '#FFF',
      width: '100%',
      textAlign: 'center',
    },
  });
  return { ...main(), ...login() };
};
export default getLoginStyle;
