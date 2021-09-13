const Env = require('./Env.js');

const defaultServerHost = Env.getDefaultServerHost();
const defaultAppBase = ''; //Env.getAppBase();

// Back-end
const getUsuarioInfoUrl = (host = defaultServerHost) => {
  return `${host}/usuario/me`;
};

const getLoginUrl = (host = defaultServerHost) => {
  return `${host}/usuario/login`;
};

// Front-end
const getLoginPageUrl = (appBase = defaultAppBase) => {
  return `${appBase}/login`;
};

const getDashboardHomeUrl = (appBase = defaultAppBase) => {
  return `${appBase}/dashboard`;
};

module.exports = {
  getUsuarioInfoUrl,
  getLoginUrl,
  getLoginPageUrl,
  getDashboardHomeUrl,
};
