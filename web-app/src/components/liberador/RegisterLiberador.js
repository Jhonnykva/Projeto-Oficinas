import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerLiberador } from '../../redux/actions/cadeado';

import { Box, TextField, Button } from '@material-ui/core';
import { AddBox } from '@material-ui/icons';

const RegisterLiberador = ({ loading, error, registerLiberador, ...props }) => {
  const [liberador, setLiberador] = useState({ alias: '' });

  useEffect(() => {
    if (!loading && !error) setLiberador({ alias: '' });
  }, [loading, error]);

  const handleOnChange = (e) => {
    if (e && e.target.name)
      setLiberador({ ...liberador, [e.target.name]: e.target.value });
  };

  const handleOnClick = () => {
    registerLiberador(liberador);
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
        name="alias"
        label="Alias"
        variant="outlined"
        size="small"
        value={liberador.alias}
        onChange={handleOnChange}
        style={{ flexGrow: 1 }}
      />
      <Button onClick={handleOnClick}>
        <AddBox />
      </Button>
    </Box>
  );
};

RegisterLiberador.propTypes = {
  registerLiberador: PropTypes.func.isRequired,
  error: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  loading: state.cadeado.loading,
  error: state.cadeado.error,
  ...ownProps,
});
export default connect(mapStateToProps, { registerLiberador })(
  RegisterLiberador
);
