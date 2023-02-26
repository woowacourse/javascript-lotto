const EventHandler = {
  handleEvent(element, event, callback) {
    element.addEventListener(event, () => {
      callback();
    });
  },

  handleClickEvent(element,callback) {
    element.addEventListener("click", () => {
      callback();
    });
  },

  handleESCKeyEvent(element,callback) {
    element.addEventListener("keyup", (e) => {
      e.code === "Escape" && callback();
    });
  },
};

export default EventHandler;
