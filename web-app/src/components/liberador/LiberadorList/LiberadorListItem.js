import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateLiberador } from '../../../redux/actions/cadeado';

import { Box, Switch, Typography, useTheme } from '@material-ui/core';
import getCadeadoStyle from '../../../styles/getCadeadoStyle';
import LiberadorQrCode from '../LiberadorQrCode';

const LiberadorListItem = ({ id, alias, ativo, loading, updateLiberador }) => {
  const theme = useTheme();
  const style = getCadeadoStyle(theme);
  const labelProps = { className: style.cadeadoItemLabel };
  const valueProps = { className: style.cadeadoItemValue };

  const handleOnSwitchClick = () => {
    if (!loading) {
      updateLiberador({ id, ativo: !ativo });
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      className={style.cadeadoListItemContainer}
    >
      <LiberadorQrCode
        id={id}
        style={{ height: '5rem', width: '5rem', margin: 'auto auto' }}
      />
      <Box
        display="flex"
        flexDirection="column"
        padding="1rem"
        width="100%"
        margin="auto auto"
      >
        <Item
          label="ID"
          value={id}
          labelProps={labelProps}
          valueProps={labelProps}
        />
        <Item
          label="Alias"
          value={alias}
          labelProps={labelProps}
          valueProps={valueProps}
        />
        <Item
          label="Ativo"
          value={ativo ? 'SIM' : 'NÃO'}
          labelProps={labelProps}
          valueProps={valueProps}
        />
      </Box>

      <Switch
        checked={ativo}
        defaultChecked={ativo}
        onClick={handleOnSwitchClick}
      ></Switch>
    </Box>
  );
};

LiberadorListItem.propTypes = {
  id: PropTypes.string.isRequired,
  ativo: PropTypes.bool.isRequired,
  alias: PropTypes.string.isRequired,
};

LiberadorListItem.defaultProps = {
  id: '',
  ativo: false,
  alias: 'N/A',
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

export default connect(mapStateToProps, { updateLiberador })(LiberadorListItem);
