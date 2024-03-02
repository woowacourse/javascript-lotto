import { ELEMENT_SELECTOR, LOTTO_RULES } from "../../constants/lotto";

export default class LottoPurchaseForm {
  static #purchaseForm = document.getElementById(ELEMENT_SELECTOR.purchaseForm);

  static #purchasedLottoContainer = document.getElementById(
    ELEMENT_SELECTOR.purchasedLottoContainer,
  );

  static #lottoPurchaseInput = document.getElementById(
    ELEMENT_SELECTOR.purchaseInput,
  );

  static #shouldRenderScrollMessage(lottosCount) {
    return lottosCount > LOTTO_RULES.scrollThreadhold;
  }

  static #renderPurchasedLottosCount(lottosCount) {
    const lottosCountText = document.createElement("span");
    lottosCountText.className = "text-sm font-light";

    const lottosCountMessage = `총 ${lottosCount}개를 구매하였습니다.`;
    const scrollMessage = "(스크롤로 구입한 모든 로또를 확인할 수 있습니다.)";

    lottosCountText.innerHTML = LottoPurchaseForm.#shouldRenderScrollMessage(
      lottosCount,
    )
      ? lottosCountMessage + scrollMessage
      : lottosCountMessage;

    LottoPurchaseForm.#purchasedLottoContainer.appendChild(lottosCountText);
  }

  static focusPurchaseInput() {
    LottoPurchaseForm.#lottoPurchaseInput.focus();
  }

  static removePurchasedLottos() {
    LottoPurchaseForm.#purchasedLottoContainer.innerHTML = "";
  }

  static renderPurchasedLottos(lottoNumbers, lottosCount) {
    LottoPurchaseForm.removePurchasedLottos();
    LottoPurchaseForm.#renderPurchasedLottosCount(lottosCount);

    const lottosList = document.createElement("ul");
    lottosList.className = "overflow-y-scroll h-20vh";
    lottosList.innerHTML = lottoNumbers.reduce((accHTML, currNumbers) => {
      return (
        accHTML +
        `<li class="text-sm font-light purchased-lotto">🎟️ ${currNumbers.join(", ")}</li>`
      );
    }, "");

    LottoPurchaseForm.#purchasedLottoContainer.appendChild(lottosList);
  }

  static resetPurchaseForm() {
    LottoPurchaseForm.#purchaseForm.reset();
  }
}
