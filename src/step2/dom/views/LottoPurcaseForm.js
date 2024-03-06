import { ELEMENT_SELECTOR, LOTTO_RULES } from "../../constants/lotto";

export default class LottoPurchaseForm {
  static #purchaseForm = document.getElementById(ELEMENT_SELECTOR.purchaseForm);

  static #purchasedLottoContainer = document.getElementById(
    ELEMENT_SELECTOR.purchasedLottoContainer
  );

  static #lottoPurchaseInput = document.getElementById(
    ELEMENT_SELECTOR.purchaseInput
  );

  static #purchasedLottosCount = document.getElementById(
    "purchased-lottos-count"
  );

  static #shouldRenderScrollMessage(element) {
    return element.scrollHeight > element.clientHeight;
  }

  static #renderPurchasedLottosCount(purchsedContainer, lottosCount) {
    const lottosCountText = document.createElement("span");
    lottosCountText.className = "text-sm font-light";

    const lottosCountMessage = `총 ${lottosCount}개를 구매하였습니다.`;
    const scrollMessage = "(스크롤로 구입한 모든 로또를 확인할 수 있습니다.)";
    lottosCountText.innerHTML = LottoPurchaseForm.#shouldRenderScrollMessage(
      purchsedContainer
    )
      ? lottosCountMessage + scrollMessage
      : lottosCountMessage;

    LottoPurchaseForm.#purchasedLottoContainer.insertBefore(
      lottosCountText,
      LottoPurchaseForm.#purchasedLottoContainer.firstChild
    );
  }

  static focusPurchaseInput() {
    LottoPurchaseForm.#lottoPurchaseInput.focus();
  }

  static removePurchasedLottos() {
    LottoPurchaseForm.#purchasedLottoContainer.innerHTML = "";
  }

  static renderPurchasedLottos(lottoNumbers) {
    LottoPurchaseForm.removePurchasedLottos();
    const lottosList = document.createElement("ul");
    lottosList.className = "overflow-y-scroll h-20vh";
    lottosList.innerHTML = lottoNumbers.reduce((accHTML, currNumbers) => {
      return (
        accHTML +
        `<li class="text-sm font-light purchased-lotto">🎟️ ${currNumbers.join(
          ", "
        )}</li>`
      );
    }, "");

    LottoPurchaseForm.#purchasedLottoContainer.appendChild(lottosList);
    LottoPurchaseForm.#renderPurchasedLottosCount(
      lottosList,
      lottoNumbers.length
    );
  }

  static resetPurchaseForm() {
    LottoPurchaseForm.#purchaseForm.reset();
  }
}
