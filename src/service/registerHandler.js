function registerHandler(selector, eventType, handler) {
  document.addEventListener(eventType, (event) => {
    if (event.target.closest(selector)) {
      handler(event);
    }
  });
}

export default registerHandler;
