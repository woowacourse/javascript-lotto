import { cloneObject } from '../utils/utils.js';

export default class Model {
  state;

  init(callback) {
    const initState = {
      lottoList: [],
    };

    this.update(initState);

    callback(this.getState());
  }

  update(newState) {
    this.state = { ...this.state, ...newState };
  }

  getState() {
    return cloneObject(this.state);
  }
}
