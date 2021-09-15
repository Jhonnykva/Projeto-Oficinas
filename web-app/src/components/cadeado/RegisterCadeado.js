import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerCadeado } from '../../redux/actions/cadeado';

import { Box, TextField, Button } from '@material-ui/core';
import { AddBox } from '@material-ui/icons';

const RegisterCadeado = ({ loading, error, registerCadeado, ...props }) => {
  const [cadeado, setCadeado] = useState({ nome: '' });

  useEffect(() => {
    if (!loading && !error) setCadeado({ nome: '' });
  }, [loading, error]);

  const handleOnChange = (e) => {
    if (e && e.target.name)
      setCadeado({ ...cadeado, [e.target.name]: e.target.value });
  };

  const handleOnClick = () => {
    registerCadeado(cadeado);
  };

  return (
    <Box
      display="flex"
      alignContent="stretch"
      paddingTop="0.5rem"
      paddingBottom="0.5rem"
      {...props}
    >
      <TextField
        name="nome"
        label="Nome"
        variant="outlined"
        size="small"
        value={cadeado.nome}
        onChange={handleOnChange}
        style={{ flexGrow: 1 }}
      />
      <Button onClick={handleOnClick}>
        <AddBox />
      </Button>
    </Box>
  );
};

RegisterCadeado.propTypes = {
  registerCadeado: PropTypes.func.isRequired,
  error: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  loading: state.cadeado.loading,
  error: state.cadeado.error,
  ...ownProps,
});
export default connect(mapStateToProps, { registerCadeado })(RegisterCadeado);
