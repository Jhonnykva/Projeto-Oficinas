import React from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom';
import HomePage from './components/pages/Dashboard/Home';
import LoginPage from './components/pages/Login';

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
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/dashboard" component={HomePage} />
            </Switch>
          </Router>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
