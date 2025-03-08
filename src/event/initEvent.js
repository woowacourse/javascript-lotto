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

  initAll(callbacks) {
    this.addBuyButtonEventListener(callbacks.buyLotto);
    this.addPriceInputEventListener(callbacks.handlePriceInput);
    this.addCheckResultButtonEventListener(callbacks.clickCheckResult);
    this.addResetButtonEventListener(callbacks.resetGame);
    this.addCloseButtonEventListener(callbacks.closeDialog);
  },
};

export default initEvent;
