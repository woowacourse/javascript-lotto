/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import InputView from './view/InputView.js';
import Controller from './controller/controller.js';

class App {
  #controller;

  constructor() {
    this.#controller = new Controller();
  }

  async play() {
    await this.#controller.start();
    this.replay();
  }

  async replay() {
    const restartResponse = await InputView.readRestart();

    if (restartResponse === 'y') {
      this.#controller = new Controller();
      await this.play();
    }
  }
}

const app = new App();
app.play();
