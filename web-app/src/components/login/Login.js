import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Box,
  Button,
  TextField,
  Divider,
  useTheme,
  Typography,
} from '@material-ui/core';
import getLoginStyle from '../../styles/getLoginStyle';
import { login, clearLoginError } from '../../redux/actions/auth';
import LoadingIndicator from '../layout/LoadingIndicator';
import ErrorIndicator from '../layout/ErrorIndicator';

const Login = ({
  loading,
  error,
  token,
  onLogin,
  onSuccessLogin,
  clearLoginError,
  ...props
}) => {
  const theme = useTheme();
  const style = getLoginStyle(theme);

  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    clearLoginError();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (onSuccessLogin !== null && token !== null) onSuccessLogin();
  }, [token, onSuccessLogin]);

  const onSetUsuario = (e) => {
    if (typeof setUsuario === 'function') setUsuario(e.target.value);
  };

  const onSetPassword = (e) => {
    if (typeof setPassword === 'function') setPassword(e.target.value);
  };

  const callLogin = () => {
    if (!loading) onLogin(usuario, password);
  };

  const handleEnterPress = (event) => {
    if (event.keyCode === 13 && !loading) {
      callLogin();
    }
  };

  const readOnly = loading;

  return (
    <Fragment>
      <Box
        className={style.loginContainer}
        boxShadow={2}
        padding={4}
        borderRadius={2}
      >
        <Fragment>
          <Typography className={style.loginTitle}>Login</Typography>
          <Divider />
        </Fragment>

        <div className={style.loginItem}>
          <TextField
            variant="standard"
            id="usuario"
            label="Usuario"
            fullWidth
            inputProps={{ readOnly }}
            value={usuario}
            onChange={onSetUsuario}
          />
        </div>
        <div className={style.loginItem}>
          <TextField
            variant="standard"
            type="password"
            id="password"
            label="Senha"
            fullWidth
            inputProps={{ readOnly }}
            value={password}
            onChange={onSetPassword}
            onKeyPress={handleEnterPress}
          />
        </div>
        <div className={style.loginItem}>
          <Button
            id="login"
            variant="contained"
            fullWidth
            disabled={loading || token !== null}
            onClick={callLogin}
          >
            Login
          </Button>
        </div>
        <LoadingIndicator
          loading={loading || token !== null}
          style={{ marginTop: '1rem' }}
        />
        <ErrorIndicator error={error} />
      </Box>
    </Fragment>
  );
};

Login.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  token: PropTypes.string,
  onLogin: PropTypes.func.isRequired,
  onSuccessLogin: PropTypes.func,
  clearLoginError: PropTypes.func,
};

Login.defaultProps = {
  onLogin: () => {},
  onSuccessLogin: null,
  loading: false,
  error: null,
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  loading: state.auth.loading,
  token: state.auth.token,
  error: state.auth.error,
});

export default connect(mapStateToProps, { onLogin: login, clearLoginError })(
  Login
);
