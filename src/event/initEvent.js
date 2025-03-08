import addEvent from "../utils/addEvent.js";

const initEvent = {
  addBuyButtonEventListener(callback) {
    addEvent({
      name: ".price-input__button",
      eventType: "click",
      callback,
    });
  },

  addPriceInputEventListener(callback) {
    addEvent({
      name: ".price-input__field",
      eventType: "keydown",
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
