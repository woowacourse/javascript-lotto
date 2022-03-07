export default class View {
  bindEvent(target, eventName, handler) {
    target.addEventListener(eventName, handler);
  }
}
