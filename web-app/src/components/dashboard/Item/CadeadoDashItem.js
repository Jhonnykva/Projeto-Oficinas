import { Divider, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import getDashboardItemStyle from '../../../styles/getDashboardItemStyle';
import Cadeado from '../../cadeado/Cadeado';

const CadeadoDItem = ({ id, ...props }) => {
  const theme = useTheme();
  const style = getDashboardItemStyle(theme);

  return (
    <div {...props}>
      <Typography variant="h4">{`Cadeado ${id}`}</Typography>
      <Divider />
      <Cadeado id={id} />
    </div>
  );
};

export default CadeadoDItem;
