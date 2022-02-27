import AppController from './controllers/AppController.js';

export default class App {
  constructor() {
    this.appController = new AppController();
  }

  init() {
    this.appController.init();
  }
}
