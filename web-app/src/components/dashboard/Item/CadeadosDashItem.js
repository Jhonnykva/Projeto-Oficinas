import { Divider, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import getDashboardItemStyle from '../../../styles/getDashboardItemStyle';
import Cadeados from '../../cadeado/Cadeados';

const CadeadosDashItem = ({ ...props }) => {
  const theme = useTheme();
  const style = getDashboardItemStyle(theme);

  return (
    <div className={style.menuContainer} {...props}>
      <Typography variant="h4">Cadeados</Typography>
      <Divider />
      <Cadeados />
    </div>
  );
};

export default CadeadosDashItem;
