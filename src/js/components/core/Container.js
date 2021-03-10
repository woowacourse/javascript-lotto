class Container {
  constructor(Presentational) {
    this.initalize();
    this.createPresentational(Presentational);
  }

  initalize() {
    throw new Error("initalize() must be implemented.");
  }

  createPresentational(Presentational) {
    this.Presentational = new Presentational(this.getEventListeners());
  }

  getEventListeners() {
    throw new Error("getEventListeners() must be implemented.");
  }

  subscribe(store) {
    this.store = store;
    this.currentValue = this.select();
    this.store.subscribe(this.render.bind(this));
  }

  select() {
    throw new Error("select() must be implemented.");
  }

  render() {
    throw new Error("render() must be implemented.");
  }

  hasChanged() {
    this.previousValue = this.currentValue;
    this.currentValue = this.select();
    return this.previousValue !== this.currentValue;
  }

  updateValue() {
    this.previousValue = this.currentValue;
  }
}

export default Container;
