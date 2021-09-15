import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCadeado, clearCadeado } from '../../redux/actions/cadeado';
import { Box, Divider, Tabs, Tab } from '@material-ui/core';
import LoadingIndicator from '../layout/LoadingIndicator';
import ErrorIndicator from '../layout/ErrorIndicator';
import EmptyIndicator from '../layout/EmptyIndicator';
import CadeadoItem from './CadeadoItem';
import LiberadorList from '../liberador/LiberadorList';
import EventoList from '../evento/EventoList';
import RegisterLiberador from '../liberador/RegisterLiberador';
import CadeadoConfigQr from './CadeadoConfigQr';

const Cadeado = ({
  id,
  cadeado,
  loading,
  error,
  getCadeado,
  clearCadeado,
  ...props
}) => {
  const [tab, setTab] = useState(0);

  const handleTabChange = (e, value) => {
    setTab(value);
  };

  useEffect(() => {
    getCadeado(id);
    return () => clearCadeado();
  }, [id, getCadeado, clearCadeado]);

  return (
    <Box {...props}>
      <LoadingIndicator
        loading={loading && cadeado === null}
        label={`Carregando ${id}`}
      />
      <ErrorIndicator error={error} />
      <EmptyIndicator
        visible={cadeado === null}
        label={`Cadeado ${id} não encontrado`}
        {...props}
      />
      <CadeadoItem {...cadeado} />
      <Divider />
      <Tabs value={tab} onChange={handleTabChange}>
        <Tab label="Liberadores" />
        <Tab label="Eventos" />
        <Tab label="Configuração" />
      </Tabs>
      <TabPage value={0} tab={tab}>
        <RegisterLiberador />
        <LiberadorList liberadores={cadeado ? cadeado.liberadores : []} />
      </TabPage>
      <TabPage value={1} tab={tab}>
        <EventoList eventos={cadeado ? cadeado.eventos : []} />
      </TabPage>
      <TabPage value={2} tab={tab}>
        <CadeadoConfigQr />
      </TabPage>
    </Box>
  );
};

Cadeado.propTypes = {
  id: PropTypes.string.isRequired,
  cadeado: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  getCadeado: PropTypes.func.isRequired,
  clearCadeado: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  cadeado: state.cadeado.selected,
  loading: state.cadeado.loading,
  error: state.cadeado.error,
  ...ownProps,
});

const TabPage = ({ tab, value, children }) => {
  if (tab !== value) return <React.Fragment />;
  return children;
};

export default connect(mapStateToProps, { getCadeado, clearCadeado })(Cadeado);
