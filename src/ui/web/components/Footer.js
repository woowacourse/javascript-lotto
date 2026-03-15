import { create } from "../core/dom.js";

export const Footer = ($target) => {
  const $p = create("div", {
    class: "footer-text",
    text: "Copyright 2023. woowacourse",
  });
  $target.append($p);
};
