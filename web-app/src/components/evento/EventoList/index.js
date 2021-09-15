import React from 'react';
import PropTypes from 'prop-types';
import EmptyIndicator from '../../layout/EmptyIndicator';
import { Box } from '@material-ui/core';
import EventoListItem from './EventoListItem';

const EventoList = ({ eventos, showCadeadoLink, ...props }) => {
  if (!eventos || eventos.length <= 0)
    return <EmptyIndicator label="Sem eventos" />;
  return (
    <Box display="flex" flexDirection="column" {...props}>
      {eventos.map((evento) => (
        <EventoListItem
          key={evento.id}
          {...evento}
          showCadeadoLink={showCadeadoLink}
        />
      ))}
    </Box>
  );
};

EventoList.propTypes = {
  eventos: PropTypes.array.isRequired,
  showCadeadoLink: PropTypes.bool.isRequired,
};

EventoList.defaultProps = {
  showCadeadoLink: false,
};

export default EventoList;
