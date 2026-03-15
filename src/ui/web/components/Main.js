import { create } from "../core/dom.js";
import { PurchaseForm } from "./PurchaseForm.js";
import { LottoList } from "./LottoList.js";
import { WinningForm } from "./WinningForm.js";
import { LottoStatistics } from "./LottoStatistics.js";

export const Main = ({ onPurchase, onShowResult, onRetry }) => {
  const $main = create("main", { className: "app-main" });

  const components = {
    purchase: PurchaseForm({ onPurchase }),
    lottoList: null,
  };

  const render = ({ lottos, lottoResult, profitRate }) => {
    $main.replaceChildren();

    $main.append(PurchaseForm({ onPurchase }));

    if (lottos.length > 0) {
      $main.append(LottoList({ lottos }));
      $main.append(WinningForm({ onShowResult }));
    }

    if (lottoResult.length > 0) {
      $main.append(LottoStatistics({ lottoResult, profitRate, onRetry }));
    }
  };

  $main.append(PurchaseForm({ onPurchase }));

  return { $main: $main, render };
};
