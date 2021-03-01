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

  subscribe() {
    store.subscribe(this.render.bind(this));
  }

  select() {
    throw new Error("select() must be implemented.");
  }

  render() {
    throw new Error("render() must be implemented.");
  }

  hasChanged() {
    this.currentValue = this.select();
    return this.previousValue !== this.currentValue;
  }

  updateValue() {
    this.previousValue = this.currentValue;
  }
}

export default Container;
