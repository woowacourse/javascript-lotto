import LottoList from "./LottoList.js";
import WinningNumbersAndBonusNumber from "./WinningNumbersAndBonusNumber.js";
import registerHandler from "../service/registerHandler.js";
import LottoStore from "../Lotto/LottoStore.js";
import render from "../service/render.js";

const App = () => {
  const disablePurchaseForm = (form) => {
    form.querySelector(".lotto-purchase-form__input").disabled = true;
    form.querySelector(".lotto-purchase-form__button").disabled = true;
  };

  registerHandler(".lotto-purchase-form", "submit", (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const purchaseAmount = parseInt(formData.get("purchase-amount"), 10);
      const lottos = LottoStore.purchaseLottos(purchaseAmount);

      disablePurchaseForm(event.target);
      render(".lotto-list", LottoList(lottos));
      render(
        ".lotto-winning-bonus-number",
        WinningNumbersAndBonusNumber(lottos, purchaseAmount),
      );
    } catch (error) {
      alert(error.message);
    }
  });

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
                min="1000"
                step="1000"
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

export default App;
