import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Url from '../../../utils/Url';

import { Box, Divider, Typography, Button, useTheme } from '@material-ui/core';
import getCadeadoStyle from '../../../styles/getCadeadoStyle';
import { Info, Warning, Error, MoreVert } from '@material-ui/icons';

const EventoListItem = ({
  id,
  titulo,
  info,
  tipo,
  id_cadeado,
  createdAt,
  showCadeadoLink,
}) => {
  const theme = useTheme();
  const style = getCadeadoStyle(theme);
  const itemProps = { className: style.cadeadoItemLabel };
  return (
    <Box
      display="flex"
      // alignItems="center"
      // padding="1rem"
      className={style.cadeadoListItemContainer}
    >
      <ItemIcon
        tipo={tipo}
        style={{ fontSize: '3rem', margin: 'auto 0.5rem' }}
      />
      <Box display="flex" flexDirection="column" width="100%" padding="0.5rem">
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
      {showCadeadoLink && id_cadeado ? (
        <Button component={Link} to={Url.getDashboardCadeadoUrl(id_cadeado)}>
          <MoreVert />
        </Button>
      ) : (
        <React.Fragment />
      )}
    </Box>
  );
};

EventoListItem.propTypes = {
  id: PropTypes.string.isRequired,
  titulo: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  tipo: PropTypes.string.isRequired,
  id_cadeado: PropTypes.string.isRequired,
  showCadeadoLink: PropTypes.bool.isRequired,
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
