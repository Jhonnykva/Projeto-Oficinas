import React from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom';
import CadeadosPage from './components/pages/Dashboard/CadeadosPage';
import HomePage from './components/pages/Dashboard/HomePage';
import LoginPage from './components/pages/LoginPage';
import Url from './utils/Url';

import { Provider } from 'react-redux';
import { store } from './redux/store';

import '@fontsource/roboto';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import theme from './theme';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Switch>
              {/* <Route exact path="/" component={<Redirect />} /> */}
              <Route exact path={Url.getLoginPageUrl()} component={LoginPage} />
              <Route
                exact
                path={Url.getDashboardCadeadosUrl()}
                component={CadeadosPage}
              />
              <Route
                exact
                path={Url.getDashboardHomeUrl()}
                component={HomePage}
              />
            </Switch>
          </Router>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
