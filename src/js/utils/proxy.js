import { CLASSNAME } from "../constants/index.js";

const HTMLElementCustomMethods = {
  show() {
    this.classList.remove(CLASSNAME.COMMON.HIDDEN);
  },
  hide() {
    this.classList.add(CLASSNAME.COMMON.HIDDEN);
  },
  toggle(className, force) {
    this.classList.toggle(className, force);
  },
};

const HTMLInputElementCustomMethods = {
  clear() {
    this.value = "";
  },
  isEmpty() {
    return this.value === "";
  },
};

const bind = (obj, prop, context = obj) => {
  if (typeof obj[prop] === "function") return obj[prop].bind(context);
  return obj[prop];
};

export const wrap = ($element) => {
  if ($element === null) return null;

  const handler = {
    get(target, prop) {
      if (prop in HTMLElementCustomMethods) {
        return bind(HTMLElementCustomMethods, prop, $element);
      }

      if (
        $element instanceof HTMLInputElement &&
        prop in HTMLInputElementCustomMethods
      ) {
        return bind(HTMLInputElementCustomMethods, prop, $element);
      }

      return bind(target, prop);
    },
    set(target, prop, value) {
      target[prop] = value;
      return true;
    },
  };

  return new Proxy($element, handler);
};
