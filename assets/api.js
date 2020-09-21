import myaxios from 'axios';

myaxios.defaults.baseURL = 'http://127.0.0.1:1337';

export const coverList = function () {
  return myaxios({
    url: '/scenics/banners'
  });
};
