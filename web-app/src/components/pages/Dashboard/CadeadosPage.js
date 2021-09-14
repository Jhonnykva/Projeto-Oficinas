import React from 'react';
import CadeadosItem from '../../dashboard/Item/CadeadosItem';
import DashboardMenu from '../../dashboard/Menu/DashboardMenu';

const CadeadosPage = ({ ...props }) => {
  return (
    <main>
      <DashboardMenu>
        <CadeadosItem {...props} />
      </DashboardMenu>
    </main>
  );
};

export default CadeadosPage;
