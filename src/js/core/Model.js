import { cloneObject } from '../utils/utils.js';

export default class Model {
  state;

  init(initState, callback) {
    this.update(initState);

    callback();
  }

  update(newState) {
    this.state = { ...this.state, ...newState };
  }

  getState() {
    return cloneObject(this.state);
  }
}
