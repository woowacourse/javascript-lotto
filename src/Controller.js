import InputView from "./View/InputView";
import OutputView from "./View/OutputView";
import LottoMachine from "./Domain/LottoMachine";
import WinLottoNumber from "./Domain/WinLottoNumber";

export default class Controller {
  #lottoMachine;

  #winLottoNumber;

  async run() {
    await this.#generateLottoMoney();
    this.#generateLottos();

    await this.#generateWinLottoNumber();
  }

  async #generateLottoMoney() {
    // try {
    const money = await InputView.readMoney();
    this.#lottoMachine = new LottoMachine(money);
    // } catch (err) {
    //   console.error(err);
    //   await this.#generateLottoMoney();
    // }
  }

  #generateLottos() {
    const boughtLottos = this.#lottoMachine.getLottos();
    OutputView.printBoughtLottos(boughtLottos);
  }

  async #generateWinLottoNumber() {
    const winLottoNumbers = await this.#generateWinLottoNumbers();
    this.#winLottoNumber = new WinLottoNumber(winLottoNumbers);

    const bonusNumber = await this.#generateBonusNumber();
    this.#winLottoNumber.setBonusNumber(bonusNumber);
  }

  async #generateWinLottoNumbers() {
    const winLottoNumbers = await InputView.readWinLottoNumbers();

    return winLottoNumbers;
  }

  async #generateBonusNumber() {
    const bonusNumber = await InputView.readBonusNumber();
    return bonusNumber;
  }
}
