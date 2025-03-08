import addEvent from "../utils/addEvent.js";

const initEvent = {
  addBuyLottosEventListener(callback) {
    addEvent({
      name: ".price-input__controls",
      eventType: "submit",
      callback,
    });
  },

  addCheckResultButtonEventListener(callback) {
    addEvent({
      name: ".purchase-detail__check",
      eventType: "click",
      callback,
    });
  },

  addResetButtonEventListener(callback) {
    addEvent({
      name: "#purchase-detail__retry",
      eventType: "click",
      callback,
    });
  },

  addCloseButtonEventListener(callback) {
    addEvent({
      name: "#modal__close-button",
      eventType: "click",
      callback,
    });
  },
};

export default initEvent;
