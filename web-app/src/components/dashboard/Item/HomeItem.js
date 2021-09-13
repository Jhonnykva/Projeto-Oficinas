import { Divider, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import getDashboardItemStyle from '../../../styles/getDashboardItemStyle';
import UsuarioInfo from '../../usuario/UsuarioInfo';

const HomeItem = ({ ...props }) => {
  const theme = useTheme();
  const style = getDashboardItemStyle(theme);

  return (
    <div {...props}>
      <Typography variant="h2">Inicio</Typography>
      <Divider />
      <Divider />
      <UsuarioInfo />
    </div>
  );
};

export default HomeItem;
