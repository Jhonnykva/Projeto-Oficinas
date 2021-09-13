import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import sfetch from '../../../utils/sfectch';
import Url from '../../../utils/Url';
import { AccountCircleRounded } from '@material-ui/icons';

const UsuarioInfo = ({ token, ...props }) => {
  const [usuario, setUsuario] = useState(null);
  const [available, setAvailable] = useState(true);

  const updateUsuario = async () => {
    const usr = await getUsuario(token);
    if (usr !== usuario) {
      if (available) setUsuario(usr);
    }
  };
  useEffect(() => {
    setAvailable(true);
    return () => setAvailable(false);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (typeof token === 'string') {
      updateUsuario();
      // return () => setUsuario(null);
    } else setUsuario(null);
    // eslint-disable-next-line
  }, [token]);

  if (!usuario || usuario === null) return <Fragment />;
  return (
    <Box {...props} display="flex" padding="1rem">
      <AccountCircleRounded />
      <Typography style={{ marginLeft: '0.5rem', color: '#555' }}>
        {String(usuario.id.toUpperCase()).padStart(5, '0')}
      </Typography>
      <Typography style={{ marginLeft: '0.25rem' }}>
        {usuario.alias.toUpperCase()}
      </Typography>
    </Box>
  );
};

UsuarioInfo.propTypes = {
  token: PropTypes.string,
};

UsuarioInfo.defaultProps = {
  token: null,
};

const mapStateToProps = (state, ownProps) => ({
  token: state.auth.token,
  ...ownProps,
});

const getUsuario = async (token) => {
  try {
    const url = Url.getUsuarioInfoUrl();
    const res = await sfetch(url, { token });
    const json = await res.json();
    if (json.success) {
      return json.data;
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default connect(mapStateToProps, {})(UsuarioInfo);
