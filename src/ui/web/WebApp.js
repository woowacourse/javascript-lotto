import { create } from "./core/dom.js";

import { PurchaseForm } from "./components/PurchaseForm.js";
import { WinningForm } from "./components/WinningForm.js";
import { LottoList } from "./components/LottoList.js";
import { LottoStatistics } from "./components/LottoStatistics.js";

export const App = ($app, { lottoService }) => {
  let state = {
    purchasedAmount: 0,
    lottos: [],
    lottoResult: [],
    profitRate: null,
  };

  const $main = create("main");
  const $purchaseSection = create("section");
  const $lottoSection = create("section");
  const $winningSection = create("section");
  const $resultSection = create("section");

  const setState = (newState) => {
    state = { ...state, ...newState };
    render();
  };

  const init = () => {
    $main.append(
      $purchaseSection,
      $lottoSection,
      $winningSection,
      $resultSection,
    );
    $app.append($main);

    PurchaseForm($purchaseSection, { onPurchase });
  };

  const render = () => {
    if (state.lottos.length > 0) {
      $lottoSection.replaceChildren();
      LottoList($lottoSection, { lottos: state.lottos });

      if (!$winningSection.firstChild) {
        WinningForm($winningSection, { onShowResult });
      }
    }

    if (state.lottoResult.length > 0) {
      $resultSection.replaceChildren();
      LottoStatistics($resultSection, {
        lottoResult: state.lottoResult,
        profitRate: state.profitRate,
      });
    }
  };

  function onPurchase(amount) {
    const { lottos, purchasedAmount } = lottoService.purchase(amount);
    setState({ lottos, purchasedAmount });
  }

  function onShowResult({ winningNumbers, bonusNumber }) {
    const result = lottoService.getStatistics({
      lottosRaw: state.lottos,
      purchasedRaw: state.purchasedAmount,
      winningNumbers,
      bonusNumber,
    });
    setState({
      lottoResult: result.lottosResult,
      profitRate: result.profitRate,
    });
  }

  init();
  render();
};
