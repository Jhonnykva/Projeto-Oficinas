import { Divider, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import getDashboardItemStyle from '../../../styles/getDashboardItemStyle';
import Cadeados from '../../cadeado/Cadeados';

const HomeItem = ({ ...props }) => {
  const theme = useTheme();
  const style = getDashboardItemStyle(theme);

  return (
    <div {...props}>
      <Typography variant="h4">Cadeados</Typography>
      <Divider />
      <Cadeados />
    </div>
  );
};

export default HomeItem;
