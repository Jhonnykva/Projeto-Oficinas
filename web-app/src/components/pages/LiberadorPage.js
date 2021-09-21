import React from 'react';
import { useParams } from 'react-router-dom';
import Liberador from '../liberador/Liberador';

const LiberadorPage = ({ staticContext, ...props }) => {
  const { id_liberador, alias } = useParams();
  return (
    <main {...props}>
      <Liberador id={id_liberador} alias={alias} />
    </main>
  );
};

export default LiberadorPage;
