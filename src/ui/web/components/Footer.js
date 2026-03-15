import { create } from "../core/dom.js";

export const Footer = () => {
  const $footer = create("footer", { className: "app-footer" });
  const $p = create("div", {
    className: "footer-text",
    text: "Copyright 2023. woowacourse",
  });
  $footer.append($p);
  return $footer;
};
