import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { SentimentDissatisfied } from '@material-ui/icons';

const EmptyIndicator = ({ visible, label, icon, labelProps, ...props }) => {
  return (
    <Box {...props} display="flex" justifyContent="center" alignItems="center">
      {icon !== null ? icon : ''}
      <Typography {...labelProps}>{label}</Typography>
    </Box>
  );
};

EmptyIndicator.propTypes = {
  visible: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  labelProps: PropTypes.object.isRequired,
  height: PropTypes.string,
};

EmptyIndicator.defaultProps = {
  visible: true,
  label: 'Sem items',
  icon: <SentimentDissatisfied />,
  labelProps: {},
};

export default EmptyIndicator;
