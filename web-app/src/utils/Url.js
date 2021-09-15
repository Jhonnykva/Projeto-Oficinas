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

const registerCadeadoUrl = (host = defaultServerHost) => {
  return `${host}/cadeado`;
};

const getCadeadosUrl = (host = defaultServerHost) => {
  return `${host}/cadeado`;
};

const getCadeadoByIdUrl = (id, host = defaultServerHost) => {
  return `${host}/cadeado/${id}`;
};

const updateCadeadoUrl = (id, host = defaultServerHost) => {
  return `${host}/cadeado/${id}`;
};

const getCadeadoConfigQrUrl = (id, host = defaultServerHost) => {
  return `${host}/cadeado/${id}/config_qr`;
};

const registerLiberadorUrl = (host = defaultServerHost) => {
  return `${host}/liberador`;
};

const getLiberadorCadeadoQrCodeUrl = (id, host = defaultServerHost) => {
  return `${host}/liberador/${id}/qr`;
};

const updateLiberadorUrl = (id, host = defaultServerHost) => {
  return `${host}/liberador/${id}`;
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
  registerCadeadoUrl,
  getCadeadosUrl,
  updateCadeadoUrl,
  registerLiberadorUrl,
  getCadeadoByIdUrl,
  getCadeadoConfigQrUrl,
  getLiberadorCadeadoQrCodeUrl,
  updateLiberadorUrl,
  getLoginPageUrl,
  getDashboardHomeUrl,
  getDashboardCadeadosUrl,
  getDashboardCadeadoUrl,
};
