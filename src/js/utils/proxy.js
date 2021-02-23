import { CLASSNAME } from "../constants/index.js";

const HTMLElementCustomMethods = {
  show() {
    this.classList.remove(CLASSNAME.COMMON.HIDDEN);
  },
  hide() {
    this.classList.add(CLASSNAME.COMMON.HIDDEN);
  },
  toggle(className) {
    this.classList.toggle(className);
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

export const wrap = ($element) => {
  if ($element === null) return null;

  const handler = {
    get(target, propKey) {
      if (
        $element instanceof HTMLInputElement &&
        propKey in HTMLInputElementCustomMethods
      ) {
        return Reflect.get(HTMLInputElementCustomMethods, propKey, $element);
      }

      if (propKey in HTMLElementCustomMethods) {
        return Reflect.get(HTMLElementCustomMethods, propKey, $element);
      }

      if (typeof target[propKey] === "function") {
        return target[propKey].bind(target);
      }

      return target[propKey];
    },
    set(target, propKey, value) {
      return Reflect.set(target, propKey, value);
    },
    has(target, propKey) {
      if (
        target instanceof HTMLInputElement &&
        propKey in HTMLInputElementCustomMethods
      ) {
        return true;
      }

      if (propKey in HTMLElementCustomMethods) {
        return true;
      }

      return propKey in target;
    },
  };

  return new Proxy($element, handler);
};
