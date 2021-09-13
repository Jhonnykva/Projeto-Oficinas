import React from 'react';
import { useTheme } from '@material-ui/core';
import Url from '../../utils/Url';
import Login from '../login/Login';
import getLoginStyle from '../../styles/getLoginStyle';
import { useHistory } from 'react-router-dom';

const LoginPage = ({ ...props }) => {
  const theme = useTheme();
  const style = getLoginStyle(theme);
  const history = useHistory();
  const onSuccessLogin = () => {
    history.replace(Url.getDashboardHomeUrl());
  };
  return (
    <main className={style.loginPage}>
      <Login onSuccessLogin={onSuccessLogin} />
    </main>
  );
};

export default LoginPage;
