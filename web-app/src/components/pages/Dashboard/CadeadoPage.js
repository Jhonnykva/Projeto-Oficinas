import React from 'react';
import { useParams } from 'react-router-dom';

import CadeadoDashItem from '../../dashboard/Item/CadeadoDashItem';
import DashboardMenu from '../../dashboard/Menu/DashboardMenu';

const CadeadoPage = ({ staticContext, ...props }) => {
  const { id } = useParams();
  return (
    <main>
      <DashboardMenu>
        <CadeadoDashItem id={id} {...props} />
      </DashboardMenu>
    </main>
  );
};

export default CadeadoPage;
