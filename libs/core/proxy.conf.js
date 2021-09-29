// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
var endpoints = {
  digitalaccount: {
    port: 3434,
  },
  gldplatform: {
    port: 3535,
  },
  gldoutbound: {
    port: 3636,
  },
  gldwarehouse: {
    port: 3737,
  },
  gldreports: {
    port: 3838,
  },
  gldinbound: {
    port: 3939,
  },
  gldshipments: {
    port: 3939,
  },
  scsshipments: {
    port: 3232,
  },
  gldbrokerage: {
    port: 4040,
  },
  gldplatform_scripts: {
    port: 7010,
    fromlocal: true,
  },
  gldoutbound_scripts: {
    port: 7104,
    fromlocal: true,
  },
  gldwarehouse_scripts: {
    port: 7102,
    fromlocal: true,
  },
  gldinbound_scripts: {
    port: 7050,
    fromlocal: true,
  },
  gldreports_scripts: {
    port: 7040,
    fromlocal: true,
  },
  gldbilling_scripts: {
    port: 7106,
    fromlocal: true,
  },
  gldshipments_scripts: {
    port: 7206,
    fromlocal: true,
  },
  gldbrokerage_scripts: {
    port: 7306,
    fromlocal: true,
  },
  digitalplatform: {
    port: 3232,
    fromlocal: false,
  },
};

const fromlocal = false;

const commonDomain = 'http://localhost:3000/';

/**
 * getTarget for proxy
 * @param {string} endpoint
 */

function getTarget(endpoint) {
  let isfromlocal = fromlocal;
  let domain = commonDomain;

  try {
    if (endpoints[endpoint].hasOwnProperty('fromlocal')) {
      isfromlocal = endpoints[endpoint].fromlocal;
    }
    if (endpoints[endpoint].hasOwnProperty('domain')) {
      domain = endpoints[endpoint].domain;
    }
  } catch (err) {}

  if (isfromlocal) {
    return `https://localhost:${endpoints[endpoint].port}/`;
  } else {
    return domain;
  }
}

const PROXY_CONFIG = {
  '/api/scsaccount/*': {
    target: getTarget('digitalaccount'),
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
  '/api/gldplatform/*': {
    target: getTarget('gldplatform'),
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
  '/api/gldoutbound/*': {
    target: getTarget('gldoutbound'),
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
  '/api/brokerage/*': {
    target: getTarget('gldbrokerage'),
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
  '/api/gldwarehouse/*': {
    target: getTarget('gldwarehouse'),
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
  '/api/gldreports/*': {
    target: getTarget('gldreports'),
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
  '/api/gldinbound/*': {
    target: getTarget('gldinbound'),
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
  '/api/gldmovement/*': {
    target: getTarget('gldshipments'),
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
  '/gldplatform/*': {
    target: getTarget('gldplatform_scripts'),
    pathRewrite: {
      '^/gldplatform': '',
    },
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
  '/gldoutbound/*': {
    target: getTarget('gldoutbound_scripts'),
    pathRewrite: {
      '^/gldoutbound': '',
    },
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
  '/gldwarehouse/*': {
    target: getTarget('gldwarehouse_scripts'),
    pathRewrite: {
      '^/gldwarehouse': '',
    },
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
  '/gldinbound/*': {
    target: getTarget('gldinbound_scripts'),
    pathRewrite: {
      '^/gldinbound': '',
    },
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
  '/gldbrokerage/*': {
    target: getTarget('gldbrokerage_scripts'),
    pathRewrite: {
      '^/gldbrokerage': '',
    },
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
  '/gldreports/*': {
    target: getTarget('gldreports_scripts'),
    pathRewrite: {
      '^/gldreports': '',
    },
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
  '/gldbilling/*': {
    target: getTarget('gldbilling_scripts'),
    pathRewrite: {
      '^/gldbilling': '',
    },
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
  '/gldshipments/*': {
    target: getTarget('gldshipments_scripts'),
    pathRewrite: {
      '^/gldshipments': '',
    },
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
  '/api/scsshipments/*': {
    target: getTarget('scsshipments'),
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
  '/api/scsplatform/*': {
    target: getTarget('digitalplatform'),
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
  '/api/glddocument/*': {
    target: getTarget('gldinbound'),
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
};

module.exports = PROXY_CONFIG;
