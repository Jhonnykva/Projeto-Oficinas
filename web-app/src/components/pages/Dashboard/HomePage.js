import React from 'react';
import HomeDashItem from '../../dashboard/Item/HomeDashItem';
import DashboardMenu from '../../dashboard/Menu/DashboardMenu';

const HomePage = ({ staticContext, ...props }) => {
  return (
    <main>
      <DashboardMenu>
        <HomeDashItem {...props} />
      </DashboardMenu>
    </main>
  );
};

export default HomePage;
