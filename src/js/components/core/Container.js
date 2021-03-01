import store from "../../store/index.js";

class Container {
  constructor() {
    this.initalize();
    this.subscribe();
    this.previousValue = this.select();
    this.currentValue = this.select();
  }

  initalize() {
    throw new Error("initalize() must be implemented.");
  }

  select() {
    throw new Error("select() must be implemented.");
  }

  updateValue() {
    this.previousValue = this.currentValue;
  }

  hasChanged() {
    this.currentValue = this.select();
    return this.previousValue !== this.currentValue;
  }

  subscribe() {
    store.subscribe(this.render.bind(this));
  }

  render() {
    throw new Error("render() must be implemented.");
  }
}

export default Container;
