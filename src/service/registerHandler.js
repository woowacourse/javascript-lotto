function registerHandler(selector, eventType, handler) {
  document.addEventListener(eventType, (event) => {
    if (event.target.matches(selector)) {
      handler(event);
    }
  });
}

export default registerHandler;
