import React from 'react';
import PropTypes from 'prop-types';
import { Box, Divider, Typography } from '@material-ui/core';
import LiberadorQrCode from './LiberadorQrCode';

const Liberador = ({ id, alias, ...props }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      style={{ background: '#ff9900' }}
    >
      <Box
        {...props}
        display="flex"
        flexDirection="column"
        overflow="hidden"
        borderRadius="1rem"
        boxShadow="2"
        style={{ background: '#FFF' }}
      >
        <Typography
          variant="h4"
          align="center"
          style={{
            padding: '1rem',
          }}
        >
          {alias}
        </Typography>
        <Divider />
        <LiberadorQrCode
          id={id}
          style={{
            height: 'auto',
            width: '50vh',
            margin: 'auto auto',
            padding: '0rem 1rem',
          }}
        />
      </Box>
    </Box>
  );
};

Liberador.propTypes = {
  id: PropTypes.string.isRequired,
  alias: PropTypes.string.isRequired,
};

Liberador.defaultProps = {
  alias: '',
};

export default Liberador;
