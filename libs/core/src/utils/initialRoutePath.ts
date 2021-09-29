// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
//

declare let window: any;

const getInitialRoute = (basehref) => {
  const pathName = window.location.pathname;
  const params = new URLSearchParams(window.location.search);

  const queryParams = [];

  if (params) {
    params.forEach((value, key) => {
      queryParams.push({
        [key]: value,
      });
    });
  }

  return {
    pathName: basehref ? pathName && pathName.split(basehref)[1] : pathName,
    params: params ? queryParams : params,
  };
};

export default getInitialRoute;
