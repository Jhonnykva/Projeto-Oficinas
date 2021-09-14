import React from 'react';
import PropTypes from 'prop-types';
import EmptyIndicator from '../../layout/EmptyIndicator';
import { Box } from '@material-ui/core';
import LiberadorListItem from './LiberadorListItem';

const LiberadorList = ({ liberadores, ...props }) => {
  if (!liberadores || liberadores.length <= 0)
    return <EmptyIndicator label="Sem liberadores" />;
  return (
    <Box display="flex" flexDirection="column" {...props}>
      {liberadores.map((liberador) => (
        <LiberadorListItem key={liberador.id} {...liberador} />
      ))}
    </Box>
  );
};

LiberadorList.propTypes = {
  liberadores: PropTypes.array.isRequired,
};

export default LiberadorList;
