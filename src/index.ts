import App from './config/app';

(async () => {
  await App.initMongo();

  await App.startServer();
})();
