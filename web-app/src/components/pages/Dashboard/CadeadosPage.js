import React from 'react';
import CadeadosDashItem from '../../dashboard/Item/CadeadosDashItem';
import DashboardMenu from '../../dashboard/Menu/DashboardMenu';

const CadeadosPage = ({ staticContext, ...props }) => {
  return (
    <main>
      <DashboardMenu>
        <CadeadosDashItem {...props} />
      </DashboardMenu>
    </main>
  );
};

export default CadeadosPage;
