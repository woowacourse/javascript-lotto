import { create } from "../core/dom.js";

export const Header = ($target) => {
  const $h1 = create("h1", {
    text: "🎱 행운의 로또",
    class: "header-text",
  });
  $target.append($h1);
};
