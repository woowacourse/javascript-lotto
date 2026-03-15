import { PurchaseForm } from "./components/PurchaseForm.js";
import { create } from "./core/dom.js";

export const App = ($target, { purchaseUseCase }) => {
  let state = {
    purchasedAmount: 0,
    lottos: [],
  };

  const renderLayout = () => {
    const $main = create("main", { id: "main-container" });
    $target.append($main);

    renderMainContents($main);
  };

  const renderMainContents = ($main) => {
    PurchaseForm($main, {
      onPurchase: (amount) => {
        purchaseLotto(amount);
      },
    });
  };

  const purchaseLotto = (amount) => {
    const purchaseDto = purchaseUseCase.execute(amount);
    const { lottos, purchasedAmount } = purchaseDto;

    state = { lottos: lottos, purchasedAmount: purchasedAmount };

    const $main = document.querySelector("#main-container");
    state.lottos.forEach((lotto) => {
      const $lotto = create("div", { text: lotto, class: "lotto-item" });
      $main.append($lotto);
    });
  };

  renderLayout();
};
