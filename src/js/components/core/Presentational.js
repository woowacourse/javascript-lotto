class Presentational {
  constructor(eventListeners) {
    this.initalize();
    this.eventListeners = eventListeners;
    // this.setEventListeners(eventListeners);
  }

  initalize() {
    throw new Error("initalize() must be implemented.");
  }

  setEventListeners() {
    throw new Error("setEventListeners() must be implemented.");
  }

  render() {
    throw new Error("render() must be implemented.");
  }
}

export default Presentational;
