import Money from "../shared/domain/Money.js";

export default class PurchaseLottoUseCase {
  #lottoMachine;

  constructor(lottoMachine) {
    this.#lottoMachine = lottoMachine;
  }

  execute(amount) {
    const money = new Money(amount);
    const { lottos, purchasedMoney } = this.#lottoMachine.buyLottos(money);

    return {
      lottoNumbers: lottos.map((lotto) => lotto.getNumbers()),
      purchasedAmount: purchasedMoney.getAmount(),
    };
  }
}
