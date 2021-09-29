// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// Load scripts for each app

import CommonUtility from './commonUtil';

declare let window: any;

export interface MicroAppScript {
  app: {
    path: string;
    web_http_port?: number;
    web_https_port?: number;
  };
  files: string[];
  isProduction: boolean;
}

const getDomain = (microApp) => {
  let domain = '';
  if (window.location && window.location.port) {
    domain = `https://${CommonUtility.getWindowLocationProperty('hostname')}${
      microApp.isProduction ? '' : ':' + microApp.app.web_https_port
    }`;
  } else {
    domain = `/${microApp.app.path}`;
  }
  return domain + ``;
};

const getScript = (microApp: MicroAppScript): string => {
  const {
    app: { path: microAppName },
    files,
  } = microApp;
  const scripts = window.microapps_scripts[microAppName];
  files.forEach((script) => {
    if (typeof scripts[script] === 'string') {
      return loadScript(getDomain(microApp), microAppName, scripts[script]);
    } else {
      Object.keys(scripts[script]).forEach((key) => {
        if (key === 'es2015') {
          return loadScript(
            getDomain(microApp),
            microAppName,
            scripts[script][key],
            false,
            true
          );
        } else if (key === 'es5') {
          return loadScript(
            getDomain(microApp),
            microAppName,
            scripts[script][key],
            true,
            false
          );
        } else {
          return loadScript(
            getDomain(microApp),
            microAppName,
            scripts[script][key]
          );
        }
      });
    }
  });
  return '';
};

const load = (microApps: MicroAppScript[]) => {
  const promises: any[] = [];
  microApps.forEach((microApp) => {
    const {
      app: { path: microAppName },
    } = microApp;
    if (
      window.microapps_scripts &&
      window.microapps_scripts[microAppName] &&
      window.microapps_scripts[microAppName] !== 'failed'
    ) {
      promises.push(getScript(microApp));
    } else {
      const waitForScriptLoad = new Promise((resolve, reject) => {
        const interval = setInterval(() => {
          if (
            window.microapps_scripts &&
            window.microapps_scripts[microAppName] &&
            window.microapps_scripts[microAppName] === 'failed'
          ) {
            reject(Error('Script Load Failed!!'));
            clearInterval(interval);
          } else if (
            window.microapps_scripts &&
            window.microapps_scripts[microAppName]
          ) {
            resolve(getScript(microApp));
            clearInterval(interval);
          }
        }, 500);
      });
      promises.push(waitForScriptLoad);
    }
  });

  return Promise.all(promises);
};

const loadScript = (
  domain,
  microAppName,
  file,
  isNoModuleType = false,
  isModuleType = false
) => {
  return new Promise((resolve, reject) => {
    if (
      window.microapps_scripts_loaded &&
      window.microapps_scripts_loaded[microAppName] &&
      window.microapps_scripts_loaded[microAppName][file]
    ) {
      resolve({ script: file, loaded: true, status: 'Already Loaded' });
    } else {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `${domain}/${file}`;
      if (isNoModuleType && !isModuleType) {
        script.noModule = true;
        script.defer = true;
      } else if (isModuleType && !isNoModuleType && !domain.includes('http')) {
        script.type = 'module';
        script.defer = true;
      } else {
        script.defer = true;
      }

      script.onload = () => {
        if (!window.microapps_scripts_loaded) {
          window.microapps_scripts_loaded = {};
        }

        if (!window.microapps_scripts_loaded[microAppName]) {
          window.microapps_scripts_loaded[microAppName] = {};
        }

        window.microapps_scripts_loaded[microAppName][file] = true;
        resolve({ script: file, loaded: true, status: 'Loaded' });
      };

      script.onerror = (error: any) =>
        resolve({ script: file, loaded: false, status: 'Loaded' });

      document.getElementsByTagName('body')[0].appendChild(script);
    }
  });
};

export default load;
