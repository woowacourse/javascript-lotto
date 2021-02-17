import { CLASSNAME } from "../constants/index.js";

export const show = ($element) => {
  $element.classList.remove(CLASSNAME.COMMON.HIDDEN);
};

export const hide = ($element) => {
  $element.classList.add(CLASSNAME.COMMON.HIDDEN);
};
