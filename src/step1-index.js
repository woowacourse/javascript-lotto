const Controller = require("./Controller");

class App {
  constructor() {}
  play() {
    new Controller();
  }
}

const app = new App();
app.play();
