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
    const winLottoNumbers = this.#generateWinLottoNumbers();
    const bonusNumber = this.#generateBonusNumber();

    // this.#winLottoNumber = new WinLottoNumber(winLottoNumbers, bonusNumber);
  }

  #generateWinLottoNumbers() {
    // TODO: 우승 로또 번호를 입력받고 반환한다.
  }

  #generateBonusNumber() {
    // TODO: 보너스 번호를 입력받고 반환한다.
  }
}
