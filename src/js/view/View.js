export default class View {
  handlers = new Map();

  addHandler({ name, handler }) {
    const data = this.handlers.get(name) || [];
    data.push(handler);
    this.handlers.set(name, data);
  }
}
