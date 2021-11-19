import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCadeadoConfigQrCode } from '../../redux/actions/cadeado';

import { Box, TextField, Button } from '@material-ui/core';

const CadeadoConfigQr = ({ loading, getCadeadoConfigQrCode }) => {
  const [imgSrc, setImgSrc] = useState(null);
  const [info, setInfo] = useState({ ssid: '', pass: '' });

  const updateSrc = async () => {
    const res = await getCadeadoConfigQrCode(info);
    if (res.success) {
      setImgSrc(res.data);
    }
  };
  const handleOnChange = (e) => {
    if (e && e.target.name)
      setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleOnClick = () => {
    if (!loading) {
      setImgSrc(null);
      updateSrc();
    }
  };

  useEffect(() => {
    updateSrc();
    // eslint-disable-next-line
  }, []);

  const itemStyle = { marginTop: '0.25rem' };
  return (
    <Box display="flex" alignItems="center" flexWrap="wrap">
      {imgSrc ? <img src={imgSrc} alt="" /> : <React.Fragment />}
      <Box display="flex" flexDirection="column" flexGrow={1}>
        {imgSrc === null ? (
          <React.Fragment>
            <TextField
              name="ssid"
              label="SSID WiFi"
              variant="outlined"
              size="small"
              value={info.ssid}
              onChange={handleOnChange}
              style={itemStyle}
            />
            <TextField
              name="pass"
              label="Senha"
              type="password"
              variant="outlined"
              size="small"
              value={info.pass}
              onChange={handleOnChange}
              style={itemStyle}
            />
            <Button
              onClick={handleOnClick}
              disabled={loading}
              style={itemStyle}
            >
              Obter código
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment />
        )}
      </Box>
    </Box>
  );
};

CadeadoConfigQr.propTypes = {
  loading: PropTypes.bool.isRequired,
  getCadeadoConfigQrCode: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  loading: state.cadeado.loading,
});

export default connect(mapStateToProps, { getCadeadoConfigQrCode })(
  CadeadoConfigQr
);
