import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  CircularProgress,
  LinearProgress,
  Typography,
} from '@material-ui/core';

const LoadingIndicator = ({
  isLinear,
  loading,
  label,
  labelProps,
  ...props
}) => {
  if (!loading) return <Fragment />;

  if (isLinear)
    return (
      <Fragment>
        {typeof label === 'string' ? (
          <Typography {...labelProps}>{label}</Typography>
        ) : (
          ''
        )}
        <LinearProgress {...props} />
      </Fragment>
    );
  return (
    <Fragment>
      {typeof label === 'string' ? (
        <Typography {...labelProps}>{label}</Typography>
      ) : (
        ''
      )}
      <CircularProgress {...props} />
    </Fragment>
  );
};

LoadingIndicator.propTypes = {
  isLinear: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  label: PropTypes.string,
  labelProps: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object,
};

LoadingIndicator.defaultProps = {
  isLinear: true,
  loading: false,
  label: null,
  labelProps: {},
};

export default LoadingIndicator;
