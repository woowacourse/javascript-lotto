class Presentational {
  constructor({ eventListeners }) {
    this.initalize();
    this.setEventListener({ eventListeners });
  }

  initalize() {
    throw new Error("initalize() must be implemented.");
  }

  setEventListener() {
    throw new Error("setEventListener() must be implemented.");
  }

  render() {
    throw new Error("render() must be implemented.");
  }
}

export default Presentational;
