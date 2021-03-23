import { ELEMENT } from "./constants.js";
import { $ } from "./querySelector.js";

const showContainer = (container) => {
  $(container).classList.remove(ELEMENT.HIDDEN);
};

const hideContainer = (container) => {
  $(container).classList.add(ELEMENT.HIDDEN);
};

export { showContainer, hideContainer };
