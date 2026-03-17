import LOTTO from "../constants/lotto.js";
import { disableForm, getFormData } from "../dom/index.js";
import LottoStore from "../Lotto/LottoStore.js";
import registerHandler from "../service/registerHandler.js";
import render from "../service/render.js";
import LottoList from "./LottoList.js";
import WinningNumbersAndBonusNumber from "./WinningNumbersAndBonusNumber.js";

function disablePurchaseForm() {
  const purchaseForm = document.querySelector(".lotto-purchase-form");
  disableForm(purchaseForm);
}

export function withEventHandlers(WrappedComponent) {
  return (props) => {
    registerHandler(".lotto-purchase-form", "submit", (event) => {
      event.preventDefault();
      try {
        const { "purchase-amount": purchaseFromData } = getFormData(
          event.target,
          "purchase-amount",
        );
        const purchaseAmount = Number(purchaseFromData[0]);

        const lottos = LottoStore.purchaseLottos(purchaseAmount);

        render(".lotto-list", LottoList({ lottos }));
        render(
          ".lotto-winning-bonus-number",
          WinningNumbersAndBonusNumber({ lottos, purchaseAmount }),
        );

        disablePurchaseForm();
      } catch (error) {
        alert(error.message);
      }
    });

    return WrappedComponent(props);
  };
}

const App = () => {
  return `
    <header class="lotto-header">
      <h1 class="lotto-header__title">🎱 행운의 로또</h1>
    </header>
    <main class="lotto-main">
      <div class="lotto-content">
        <h2 class="lotto-content-header__title">🎱 내 번호 당첨 확인 🎱</h2>
        <section class="lotto-purchase">
          <form class="lotto-purchase-form">
            <label for="purchase-amount">구입할 금액을 입력해주세요.</label>
            <div class="lotto-purchase-form__input-group">
              <input
                type="number"
                name="purchase-amount"
                id="purchase-amount"
                placeholder="금액"
                class="lotto-purchase-form__input"
                min="${LOTTO.UNIT}"
                step="${LOTTO.UNIT}"
              />
              <button type="submit" class="lotto-purchase-form__button">
                구입
              </button>
            </div>
          </form>
        </section>
        <section class="lotto-list"></section>
        <section class="lotto-winning-bonus-number"></section>
        <section class="lotto-result"></section>
      </div>
    </main>
    <footer class="lotto-footer">
      <p>Copyright 2026. woowacourse</p>
    </footer>
  `;
};

export default withEventHandlers(App);
