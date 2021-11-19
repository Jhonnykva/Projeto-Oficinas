const getDefaultServerHost = () => {
  return process.env.REACT_APP_SERVER_HOST || 'http://localhost:5055/api/v1';
};

const getAppBase = () => {
  return process.env.REACT_APP_APP_BASE || '';
};

module.exports = { getDefaultServerHost, getAppBase };
