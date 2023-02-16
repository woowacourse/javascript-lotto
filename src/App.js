const LottoGameController = require('./controller/LottoGameController');

class App {
  start() {
    new LottoGameController().play();
  }
}

module.exports = App;
