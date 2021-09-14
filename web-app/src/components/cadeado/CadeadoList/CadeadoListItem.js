import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, useTheme } from '@material-ui/core';
import getCadeadoStyle from '../../../styles/getCadeadoStyle';

const CadeadoListItem = ({ nome, associado, estado }) => {
  const theme = useTheme();
  const style = getCadeadoStyle(theme);
  const labelProps = { className: style.cadeadoItemLabel };
  const valueProps = { className: style.cadeadoItemValue };
  return (
    <Box display="flex" className={style.cadeadoListItemContainer}>
      <Box display="flex" flexDirection="column" padding="1rem">
        <Item
          label="Nome"
          value={nome}
          labelProps={labelProps}
          valueProps={valueProps}
        />
        <Item
          label="Associado"
          value={associado ? 'SIM' : 'NÃO'}
          labelProps={labelProps}
          valueProps={valueProps}
        />
        <Item
          label="Estado"
          value={estado}
          labelProps={labelProps}
          valueProps={valueProps}
        />
      </Box>
    </Box>
  );
};

CadeadoListItem.propTypes = {
  nome: PropTypes.string.isRequired,
  associado: PropTypes.bool.isRequired,
  estado: PropTypes.string.isRequired,
};

CadeadoListItem.defaultProps = {
  nome: 'N/A',
  associado: false,
  estado: '--',
};

const Item = ({ label, value, labelProps, valueProps, ...props }) => {
  return (
    <Box display="flex" alignItems="center" {...props}>
      <Typography {...labelProps}>{label}</Typography>
      <Typography {...valueProps}>{value}</Typography>
    </Box>
  );
};

Item.propTypes = {
  labelProps: PropTypes.object.isRequired,
  valueProps: PropTypes.object.isRequired,
};
Item.defaultProps = {
  labelProps: {},
  valueProps: {},
};

export default CadeadoListItem;
