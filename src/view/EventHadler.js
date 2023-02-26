const EventHandler = {
  handleClickEvent(element, callback) {
    element.addEventListener("click", () => {
      callback();
    });
  },

  handleESCKeyEvent(element, callback) {
    element.addEventListener("keyup", (e) => {
      e.code === "Escape" && callback();
    });
  },

  handleEnterKeyEvent(element, callback) {
    element.addEventListener("keyup", (e) => {
      e.code === "Enter" && callback();
    });
  },
};

export default EventHandler;
