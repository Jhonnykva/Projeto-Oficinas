import React from 'react';
import HomeItem from '../../dashboard/Item/HomeItem';
import DashboardMenu from '../../dashboard/Menu/DashboardMenu';

const HomePage = ({ ...props }) => {
  return (
    <main>
      <DashboardMenu>
        <HomeItem {...props} />
      </DashboardMenu>
    </main>
  );
};

export default HomePage;
