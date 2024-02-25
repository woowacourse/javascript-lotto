import GameController from './services/GameController';

class GameApp {
  #gameController = new GameController();

  async run() {
    await this.#gameController.playGame();
  }
}

export default GameApp;
