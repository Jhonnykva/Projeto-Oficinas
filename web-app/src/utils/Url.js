const Env = require('./Env.js');

const defaultServerHost =
  Env.getDefaultServerHost() || 'http://localhost:5000/api/v1';
const defaultAppBase = Env.getAppBase() || '';

// Back-end
const getUsuarioInfoUrl = (host = defaultServerHost) => {
  return `${host}/usuario/me`;
};

const getLoginUrl = (host = defaultServerHost) => {
  return `${host}/usuario/login`;
};

const getCadeadosUrl = (host = defaultServerHost) => {
  return `${host}/cadeado`;
};

const getCadeadoByIdUrl = (id, host = defaultServerHost) => {
  return `${host}/cadeado/${id}`;
};
// Front-end
const getLoginPageUrl = (appBase = defaultAppBase) => {
  return `${appBase}/login`;
};

const getDashboardHomeUrl = (appBase = defaultAppBase) => {
  return `${appBase}/dashboard`;
};

const getDashboardCadeadosUrl = (appBase = defaultAppBase) => {
  return `${appBase}/dashboard/cadeado`;
};

const getDashboardCadeadoUrl = (id, appBase = defaultAppBase) => {
  return `${appBase}/dashboard/cadeado/${id}`;
};

module.exports = {
  getUsuarioInfoUrl,
  getLoginUrl,
  getCadeadosUrl,
  getCadeadoByIdUrl,
  getLoginPageUrl,
  getDashboardHomeUrl,
  getDashboardCadeadosUrl,
  getDashboardCadeadoUrl,
};
