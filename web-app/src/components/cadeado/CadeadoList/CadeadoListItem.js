import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { updateCadeado } from '../../../redux/actions/cadeado';
import Url from '../../../utils/Url';

import { Box, Button, Typography, useTheme } from '@material-ui/core';
import getCadeadoStyle from '../../../styles/getCadeadoStyle';
import { Info, Lock, LockOpenOutlined as LockOpen } from '@material-ui/icons';

const CadeadoListItem = ({
  id,
  nome,
  associado,
  estado,
  loading,
  updateCadeado,
}) => {
  const theme = useTheme();
  const style = getCadeadoStyle(theme);
  const labelProps = { className: style.cadeadoItemLabel };
  const valueProps = { className: style.cadeadoItemValue };

  const handleCadeadoLock = () => {
    if (!loading) {
      updateCadeado({
        id,
        estado:
          String(estado).toLowerCase() === 'desbloqueado'
            ? 'Bloqueado'
            : 'Desbloqueado',
      });
    }
  };

  return (
    <Box display="flex" className={style.cadeadoListItemContainer}>
      <Box display="flex" flexDirection="column" padding="1rem" width="100%">
        <Item
          label="ID"
          value={id}
          labelProps={labelProps}
          valueProps={labelProps}
        />
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

      <Button onClick={handleCadeadoLock}>
        {String(estado).toLowerCase() === 'desbloqueado' ? (
          <LockOpen />
        ) : (
          <Lock />
        )}
      </Button>
      <Button component={Link} to={Url.getDashboardCadeadoUrl(id)}>
        <Info />
      </Button>
    </Box>
  );
};

CadeadoListItem.propTypes = {
  nome: PropTypes.string.isRequired,
  associado: PropTypes.bool.isRequired,
  estado: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  updateCadeado: PropTypes.func.isRequired,
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

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  loading: state.cadeado.loading,
});

export default connect(mapStateToProps, { updateCadeado })(CadeadoListItem);
