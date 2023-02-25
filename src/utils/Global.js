/* eslint-disable no-dupe-class-members */
class Global {
  #store = {};
  setStore(key, value) {
    this.#store[key] = value;
  }
  getStore(id) {
    return this.#store[id];
  }
}
export default Global;
