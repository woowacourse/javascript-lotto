import { create } from "../core/dom.js";

export const LottoList = ({ lottos }) => {
  const $section = create("section", { className: "lotto-list-container" });

  const $title = create("p", {
    text: `총 ${lottos.length}개를 구매하였습니다.`,
    className: "lotto-count-text",
  });
  $section.append($title);

  lottos.forEach((lotto) => {
    const $lottoItem = create("div", { className: "lotto-item" });
    const $icon = create("span", { text: "🎟️ ", className: "lotto-icon" });
    const $numbers = create("span", {
      text: lotto.join(", "),
      className: "lotto-numbers",
    });

    $lottoItem.append($icon, $numbers);
    $section.append($lottoItem);
  });

  return $section;
};
