import { makeStyles } from '@material-ui/core';
import getMainStyle from './getMainStyle';

const getMenuStyle = (theme) => {
  const main = getMainStyle(theme);
  const login = makeStyles({
    menuContainer: {
      height: '100%',
      width: '100%',
    },
    informationTitle: {
      marginTop: '1rem',
      fontSize: '0.75rem',
      textTransform: 'uppercase',
    },
  });
  return { ...main(), ...login() };
};

export default getMenuStyle;
