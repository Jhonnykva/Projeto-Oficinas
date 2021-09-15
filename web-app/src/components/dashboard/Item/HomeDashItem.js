import { Divider, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import getDashboardItemStyle from '../../../styles/getDashboardItemStyle';
import Eventos from '../../evento/Eventos';
import UsuarioInfo from '../../usuario/UsuarioInfo';

const HomeDashItem = ({ ...props }) => {
  const theme = useTheme();
  const style = getDashboardItemStyle(theme);

  return (
    <div className={style.menuContainer} {...props}>
      <Typography className={style.informationTitle}>USUARIO</Typography>
      <Divider />
      <UsuarioInfo />
      <Typography className={style.informationTitle}>EVENTOS</Typography>
      <Divider />
      <Eventos />
    </div>
  );
};

export default HomeDashItem;
