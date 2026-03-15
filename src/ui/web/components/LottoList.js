import { create } from "../core/dom.js";

export const LottoList = ($target, { lottos }) => {
  const $container = create("section", { class: "lotto-list-container" });

  const $title = create("p", {
    text: `총 ${lottos.length}개를 구매하였습니다.`,
    class: "lotto-count-text",
  });
  $container.append($title);

  lottos.forEach((lotto) => {
    const $lottoItem = create("div", { class: "lotto-item" });
    const $icon = create("span", { text: "🎟️ ", class: "lotto-icon" });
    const $numbers = create("span", {
      text: lotto.join(", "),
      class: "lotto-numbers",
    });

    $lottoItem.append($icon, $numbers);
    $container.append($lottoItem);
  });

  $target.append($container);
};
