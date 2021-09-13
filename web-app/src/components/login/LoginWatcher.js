import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Url from '../../utils/Url';

const LoginWatcher = ({ token, loading, forceRedirect, ...props }) => {
  const history = useHistory();

  useEffect(() => {
    if (!loading && typeof token !== 'string')
      history.replace(Url.getLoginPageUrl());
    // eslint-disable-next-line
  }, [token, loading]);

  return <Fragment />;
};

LoginWatcher.propTypes = {
  token: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  forceRedirect: PropTypes.bool.isRequired,
};

LoginWatcher.defaultProps = {
  forceRedirect: false,
  loading: false,
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  token: state.auth.token,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, {})(LoginWatcher);
