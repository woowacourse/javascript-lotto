import addEvent from "../utils/addEvent.js";

const initEvent = {
  addBuyButtonEventListener(callback) {
    addEvent({
      name: ".buyButton",
      eventType: "click",
      callback,
    });
  },

  addPriceInputEventListener(callback) {
    addEvent({
      name: ".priceInput",
      eventType: "keydown",
      callback,
    });
  },

  addCheckResultButtonEventListener(callback) {
    addEvent({
      name: ".checkResultButton",
      eventType: "click",
      callback,
    });
  },

  addResetButtonEventListener(callback) {
    addEvent({
      name: "#reset",
      eventType: "click",
      callback,
    });
  },

  addCloseButtonEventListener(callback) {
    addEvent({
      name: "#closeButton",
      eventType: "click",
      callback,
    });
  },
};

export default initEvent;
