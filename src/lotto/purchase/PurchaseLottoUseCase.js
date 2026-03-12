export default class PurchaseLottoUseCase {
  #lottoMachine;

  constructor(lottoMachine) {
    this.#lottoMachine = lottoMachine;
  }

  execute(money) {
    return this.#lottoMachine.buyLottos(money);
  }
}
