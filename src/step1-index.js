const Controller = require("./Controller");

class LottoConsoleGame {
  play() {
    new Controller();
  }
}

const lottoConsoleGame = new LottoConsoleGame();
lottoConsoleGame.play();
