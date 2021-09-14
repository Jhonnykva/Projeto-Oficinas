import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLiberadorCadeadoQrCode } from '../../redux/actions/cadeado';
import { BrokenImageOutlined as BrokenImage } from '@material-ui/icons';

const LiberadorQrCode = ({ id, getLiberadorCadeadoQrCode, ...props }) => {
  const [ok, setOk] = useState(true);
  const [src, setSrc] = useState(null);

  const updateSrc = async () => {
    const res = await getLiberadorCadeadoQrCode(id);
    if (ok && res.success) {
      setSrc(res.data);
    }
  };

  useEffect(() => {
    updateSrc();
    return () => setOk(false);
    //eslint-disable-next-line
  }, []);

  if (src === null) return <BrokenImage {...props} />;
  return <img src={src} {...props} />;
};

LiberadorQrCode.propTypes = {
  id: PropTypes.string.isRequired,
  getLiberadorCadeadoQrCode: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
});

export default connect(mapStateToProps, { getLiberadorCadeadoQrCode })(
  LiberadorQrCode
);
