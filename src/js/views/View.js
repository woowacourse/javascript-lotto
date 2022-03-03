export default class View {
  handlers = new Map();
  addHandler(payload) {
    const data = this.handlers.get(payload.type) || [];
    data.push(payload.handler);
    this.handlers.set(payload.type, data);
  }
}
