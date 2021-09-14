import React from 'react';
import PropTypes from 'prop-types';
import EmptyIndicator from '../../layout/EmptyIndicator';
import { Box } from '@material-ui/core';
import CadeadoListItem from './CadeadoListItem';

const CadeadoList = ({ cadeados, ...props }) => {
  if (!cadeados || cadeados.length <= 0)
    return <EmptyIndicator label="Sem cadeados" />;
  return (
    <Box display="flex" flexDirection="column" {...props}>
      {cadeados.map((cadeado) => (
        <CadeadoListItem key={cadeado.id} {...cadeado} />
      ))}
    </Box>
  );
};

CadeadoList.propTypes = {
  cadeados: PropTypes.array.isRequired,
};

export default CadeadoList;
