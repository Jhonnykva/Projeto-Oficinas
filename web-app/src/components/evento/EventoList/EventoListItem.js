import React from 'react';
import PropTypes from 'prop-types';

import { Box, Divider, Typography, useTheme } from '@material-ui/core';
import getCadeadoStyle from '../../../styles/getCadeadoStyle';
import { Info, Warning, Error } from '@material-ui/icons';

const EventoListItem = ({ id, titulo, info, tipo, createdAt }) => {
  const theme = useTheme();
  const style = getCadeadoStyle(theme);
  const itemProps = { className: style.cadeadoItemLabel };
  return (
    <Box
      display="flex"
      alignItems="center"
      padding="1rem"
      className={style.cadeadoListItemContainer}
    >
      <ItemIcon tipo={tipo} style={{ fontSize: '3rem', marginRight: '1rem' }} />
      <Box display="flex" flexDirection="column" width="100%">
        <Typography style={{ fontWeight: 'bold' }}>{titulo}</Typography>
        <Divider />
        <Typography>{info}</Typography>

        <Item
          label="Data"
          value={new Date(Date.parse(createdAt)).toLocaleString()}
          labelProps={itemProps}
          valueProps={itemProps}
        />
        <Item
          label="ID"
          value={id}
          labelProps={itemProps}
          valueProps={itemProps}
        />
      </Box>
    </Box>
  );
};

EventoListItem.propTypes = {
  id: PropTypes.string.isRequired,
  titulo: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  tipo: PropTypes.string.isRequired,
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

const ItemIcon = ({ tipo, ...props }) => {
  if (tipo === 'critical') return <Error htmlColor="red" {...props} />;
  if (tipo === 'warn') return <Warning htmlColor="orange" {...props} />;
  return <Info color="secondary" {...props} />;
};

export default EventoListItem;
