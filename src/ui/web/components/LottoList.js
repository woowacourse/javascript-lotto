import { create } from "../core/dom.js";

export const LottoList = ({ lottos }) => {
  const $section = create("section", { className: "lotto-list" });

  const $title = create("p", {
    text: `총 ${lottos.length}개를 구매하였습니다.`,
    className: "lotto-count-text lotto-body",
  });
  $section.append($title);

  const $container = create("div", { className: "lotto-list-container" });

  lottos.forEach((lotto) => {
    const $lottoItem = create("div", { className: "lotto-item lotto-body" });
    const $icon = create("span", {
      text: "🎟️ ",
      className: "lotto-icon lotto-icon ",
    });

    const $numbers = create("span", {
      text: lotto.join(", "),
      className: "lotto-number lotto-body",
    });

    $lottoItem.append($icon, $numbers);
    $container.append($lottoItem);
  });

  $section.append($container);
  return $section;
};
