import { create } from "../core/dom.js";
import { PurchaseForm } from "./PurchaseForm.js";
import { LottoList } from "./LottoList.js";
import { WinningForm } from "./WinningForm.js";

export const Main = ({ onPurchase, onShowResult }) => {
  const $main = create("main", { className: "app-main" });
  const $container = create("div", { className: "layout-container" });
  $main.append($container);

  const $title = create("h2", {
    className: "lotto-title",
    text: "🎱 내 번호 당첨 확인 🎱",
  });

  const render = ({ lottos }) => {
    $container.replaceChildren();
    $container.append($title, PurchaseForm({ onPurchase }));

    if (lottos.length > 0) {
      $container.append(LottoList({ lottos }));
      $container.append(WinningForm({ onShowResult }));
    }
  };

  return { $main, render };
};
