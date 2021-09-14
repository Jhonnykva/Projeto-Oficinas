import { makeStyles } from '@material-ui/core';
import getMainStyle from './getMainStyle';

const getCadeadoStyle = (theme) => {
  const main = getMainStyle(theme);
  const login = makeStyles({
    cadeadoItemLabel: {
      fontSize: '0.65rem',
      color: '#333',
      marginRight: '0.5rem',
    },
    cadeadoItemValue: {
      fontSize: '1rem',
    },
    cadeadoListItemContainer: {
      marginTop: '0.25rem',
      marginBottom: '0.25rem',
      transition: 'all ease-in-out 250ms',
      borderRadius: '0.25rem',
      borderBottom: 'solid primary 0.1rem',
      boxShadow: '0px 0px 7px -3px rgba(0,0,0,0.25)',

      '&:hover': {
        boxShadow: '0px 0px 14px -3px rgba(0,0,0,0.25)',
        borderRadius: '0.5rem',
      },
    },
  });
  return { ...main(), ...login() };
};
export default getCadeadoStyle;
