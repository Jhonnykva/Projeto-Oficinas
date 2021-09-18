import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEventos, clearEventos } from '../../redux/actions/evento';

import LoadingIndicator from '../layout/LoadingIndicator';
import ErrorIndicator from '../layout/ErrorIndicator';
import EventoList from './EventoList';

const Eventos = ({
  eventos,
  loading,
  error,
  getEventos,
  clearEventos,
  ...props
}) => {
  useEffect(() => {
    if (!loading) {
      getEventos();
      return () => clearEventos();
    }
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <LoadingIndicator
        loading={loading && eventos === null}
        label="Carregando eventos..."
        {...props}
      />
      <ErrorIndicator error={error} {...props} />
      <EventoList eventos={eventos ? eventos : []} showCadeadoLink />
    </Fragment>
  );
};

Eventos.propTypes = {
  eventos: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  getEventos: PropTypes.func.isRequired,
  clearEventos: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  eventos: state.evento.eventos,
  loading: state.evento.loading,
  error: state.evento.error,
});

export default connect(mapStateToProps, { getEventos, clearEventos })(Eventos);
