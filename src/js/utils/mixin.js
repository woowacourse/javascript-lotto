import { CLASSNAME } from "../constants/index.js";

const customElementMethodMixin = {
  show() {
    this.classList.remove(CLASSNAME.COMMON.HIDDEN);
    return this;
  },

  hide() {
    this.classList.add(CLASSNAME.COMMON.HIDDEN);
    return this;
  },

  toggle(className) {
    this.classList.toggle(className);
    return this;
  },
};

Object.assign(HTMLElement.prototype, customElementMethodMixin);
