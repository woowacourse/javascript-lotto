import GameManager from './services/GameManager';

class GameApp {
  #gameManager = new GameManager();

  async run() {
    await this.#gameManager.playGame();
  }
}

export default GameApp;
