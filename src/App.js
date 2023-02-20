class App {
  #controller;

  constructor(controller) {
    this.#controller = controller;
  }

  play() {
    this.#controller.init();
  }
}

export default App;
