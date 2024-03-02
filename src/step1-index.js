import LottoController from './controllers/LottoController.js';

class App {
  play() {
    new LottoController().run();
  }
}

new App().play();
