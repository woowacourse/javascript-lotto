import { create } from "../core/dom.js";
import { PurchaseForm } from "./PurchaseForm.js";
import { LottoList } from "./LottoList.js";
import { WinningForm } from "./WinningForm.js";

export const Main = ({ onPurchase, onShowResult }) => {
  const $main = create("main", { className: "app-main" });

  const render = ({ lottos }) => {
    $main.replaceChildren();

    $main.append(PurchaseForm({ onPurchase }));

    if (lottos.length > 0) {
      $main.append(LottoList({ lottos }));
      $main.append(WinningForm({ onShowResult }));
    }
  };

  $main.append(PurchaseForm({ onPurchase }));

  return { $main: $main, render };
};
