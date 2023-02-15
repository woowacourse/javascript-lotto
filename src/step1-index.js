import Amount from './view/components/Amount.js';

class App {
  async play() {
    await this.render(new Amount());
  }

  async render(component) {
    await component.read();
    await component.render();
  }
}

const app = new App();
(async () => {
  await app.play();
})();
