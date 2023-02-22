const EventHandler = {
  handleEvent(element, event, callback) {
    element.addEventListener(event, () => {
      callback();
    });
  },
};

export default EventHandler;
