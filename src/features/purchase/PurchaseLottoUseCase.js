import Money from "../../domain/Money.js";

export default class PurchaseLottoUseCase {
  #lottoMachine;

  constructor(lottoMachine) {
    this.#lottoMachine = lottoMachine;
  }

  execute(amount) {
    const money = new Money(amount);
    const { lottos, purchasedMoney } = this.#lottoMachine.buyLottos(money);

    return {
      lottos,
      purchasedAmount: purchasedMoney.getAmount(),
    };
  }
}
