export default class PurchaseLottoResponseDto {
  #lottos;
  #purchasedAmount;

  constructor(rawLottos, purchaseAmount) {
    this.#lottos = Object.freeze(rawLottos);
    this.#purchasedAmount = purchaseAmount;
    Object.freeze(this);
  }

  get lottos() {
    return this.#lottos;
  }
  get purchasedAmount() {
    return this.#purchasedAmount;
  }
}
