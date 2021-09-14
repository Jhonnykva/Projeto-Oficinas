import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCadeados, clearCadeados } from '../../redux/actions/cadeado';

import LoadingIndicator from '../layout/LoadingIndicator';
import ErrorIndicator from '../layout/ErrorIndicator';
import CadeadoList from './CadeadoList';
const Cadeados = ({
  cadeados,
  loading,
  error,
  getCadeados,
  clearCadeados,
  ...props
}) => {
  useEffect(() => {
    if (!loading) {
      getCadeados();
      return () => clearCadeados();
    }
    //eslint-disable-next-line
  }, []);

  if (loading)
    return (
      <LoadingIndicator
        loading={loading}
        label="Carregando cadeados..."
        {...props}
      />
    );

  if (error) return <ErrorIndicator error={error} {...props} />;

  return <CadeadoList cadeados={cadeados} />;
};

Cadeados.propTypes = {
  cadeados: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  getCadeados: PropTypes.func.isRequired,
  clearCadeados: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  cadeados: state.cadeado.cadeados,
  loading: state.cadeado.loading,
  error: state.cadeado.error,
});

export default connect(mapStateToProps, { getCadeados, clearCadeados })(
  Cadeados
);
