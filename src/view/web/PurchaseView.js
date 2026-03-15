import { LottoTicket } from "../../components/LottoTicket";

const PurchaseView = {
  purchaseForm: document.querySelector("#purchase-form"),
  purchasePriceInput: document.querySelector("#purchase-price"),
  countText: document.querySelector("#lotto-count-text"),
  lottoList: document.querySelector("#lotto-list"),

  onPurchase(handler) {
    this.purchaseForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const purchasedPrice = Number(this.purchasePriceInput.value);
      handler(purchasedPrice);
    });
  },

  renderPurchasedLottos(lottos) {
    this.countText.textContent = `총 ${lottos.length}개를 구매하였습니다.`;
    this.lottoList.innerHTML = lottos
      .map((lotto) => LottoTicket(lotto))
      .join("");
  },

  clearPurchasedLottos() {
    this.countText.textContent = "";
    this.lottoList.innerHTML = "";
  },

  clearPriceInput() {
    this.purchaseForm.reset();
  },
};

export default PurchaseView;
