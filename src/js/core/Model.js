export default class Model {
  state;

  init(callback) {
    const initState = this.setInitState();

    this.update(initState);
    callback(this.getState());
  }

  setInitState() {
    throw new Error('override');
  }

  update(newState) {
    this.state = { ...this.state, ...newState };
  }

  getState() {
    return this.state;
  }
}
