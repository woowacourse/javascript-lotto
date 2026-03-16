import { create } from "../core/dom.js";

export const Header = () => {
  const $header = create("header", { className: "app-header" });
  const $h1 = create("h1", {
    text: "🎱 행운의 로또",
    className: "lotto-title",
  });

  $header.append($h1);
  return $header;
};
