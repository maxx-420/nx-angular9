// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// Load google maps scripts

declare const google: any;

const loadMapsScript = (scriptToLoad: string) => {
  return new Promise((resolve, reject) => {
    // resolve if already loaded
    if (typeof google === 'object' && typeof google.maps === 'object') {
      return resolve({ script: name, loaded: true, status: 'Already Loaded' });
    }
    // load script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = scriptToLoad;
    script.onload = () => {
      return resolve({ script: name, loaded: true, status: 'Loaded' });
    };
    script.onerror = (error: any) =>
      resolve({ script: name, loaded: false, status: 'Loaded' });
    document.getElementsByTagName('head')[0].appendChild(script);
  });
};
export default loadMapsScript;
