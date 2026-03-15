import Money from "../../domain/Money.js";
import PurchaseLottoMapper from "./PurchaseLottoMapper.js";

export default class PurchaseLottoUseCase {
  #lottoMachine;

  constructor(lottoMachine) {
    this.#lottoMachine = lottoMachine;
  }

  execute({ amountRaw }) {
    const money = new Money(amountRaw);
    const { lottos, purchasedMoney } = this.#lottoMachine.buyLottos(money);

    return PurchaseLottoMapper.toDto(lottos, purchasedMoney);
  }
}
