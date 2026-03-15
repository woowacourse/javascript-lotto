import { PurchaseForm } from "./components/PurchaseForm.js";
import { WinningForm } from "./components/WinningFrom.js";
import { create } from "./core/dom.js";

export const App = ($target, { lottoService }) => {
  let state = {
    purchasedAmount: 0,
    lottos: [],
    lottoResult: [],
    profitRate: null,
  };

  const setState = (newState) => {
    state = { ...state, ...newState };
    renderLayout();
  };

  const renderLayout = () => {
    $target.replaceChildren();
    const $main = create("main", { id: "main-container" });
    $target.append($main);
    renderPurchaseForm($main);

    if (state.lottos.length !== 0) {
      renderLottoList($main);
      renderWinningForm($main);
    }

    if (state.lottoResult.length > 0) {
      renderLottoStatistics($main, {
        lottoResult: state.lottoResult,
        profitRate: state.profitRate,
      });
    }
  };

  const renderPurchaseForm = ($main) => {
    PurchaseForm($main, {
      onPurchase: (amount) => {
        purchaseLotto($main, { amount });
      },
    });
  };

  const purchaseLotto = ($main, { amount }) => {
    const purchaseDto = lottoService.purchase(amount);
    const { lottos, purchasedAmount } = purchaseDto;

    setState({ lottos, purchasedAmount });
  };

  const renderLottoList = ($main) => {
    state.lottos.forEach((lotto) => {
      const $lotto = create("div", { text: lotto, class: "lotto-item" });
      $main.append($lotto);
    });
  };

  const renderWinningForm = ($main) => {
    WinningForm($main, {
      onShowResult: ({ winningNumbers, bonusNumber }) => {
        handleWinningSubmit({ winningNumbers, bonusNumber });
      },
    });
  };

  // getStatistics({ lottosRaw, purchasedRaw, winningNumbers, bonusNumber }) {
  const handleWinningSubmit = ({ winningNumbers, bonusNumber }) => {
    const lottoResult = lottoService.getStatistics({
      lottosRaw: state.lottos,
      purchasedRaw: state.purchasedAmount,
      winningNumbers,
      bonusNumber,
    });
    setState({
      lottoResult: lottoResult.lottosResult,
      profitRate: lottoResult.profitRate,
    });
  };

  const renderLottoStatistics = ($target, { lottoResult, profitRate }) => {
    lottoResult.forEach((result) => {
      console.log(result);
      const { count } = result;
      const $count = create("div", {
        text: count,
        class: "lotto-result",
      });
      $target.append($count);
    });

    const $profitRate = create("div", {
      text: "수익률" + profitRate,
      class: "lotto-profitRate",
    });

    $target.append($profitRate);
  };

  renderLayout();
};
