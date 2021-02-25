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

  toggle(className, force) {
    this.classList.toggle(className, force);
    return this;
  },
};

const customInputElementMethodMixin = {
  clear() {
    this.value = "";
    return this;
  },
  isEmpty() {
    return this.value === "";
  },
};

Object.assign(HTMLElement.prototype, customElementMethodMixin);
Object.assign(HTMLInputElement.prototype, customInputElementMethodMixin);
