import InputHandler from './View/InputHandler';
import RenderingHandler from './View/RenderingHandler';

import LottoMachine from '../Domain/LottoMachine';
import WinLottoNumber from '../Domain/WinLottoNumber';

export default class WebController {
  #lottoMachine;

  #winLottoNumber;

  async run() {
    RenderingHandler.renderHeader();
    RenderingHandler.renderLottoComponents();
    RenderingHandler.renderFooter();

    this.#setMoneyFormEvent();
    // this.#executeLottos();
    // await this.#executeWinLottoNumber();
    // this.#executeResult();
    // await this.#executeRetry();
  }

  #setMoneyFormEvent() {
    const moneyForm = document.getElementById('moneyForm');
    moneyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      try {
        const money = Number(e.target.money.value);
        this.#lottoMachine = new LottoMachine(money);
        this.#executeLottos();
      } catch (error) {
        alert(error.message);
      }
    });
  }

  // handleLottoMoney(e) {
  //   e.preventDefault();
  //   try {
  //     const money = Number(e.target.money.value);
  //     WebController.lottoMachine = new LottoMachine(money);
  //     this.#executeLottos();
  //   } catch (err) {
  //     alert(err.message);
  //   }
  // }

  #executeLottos() {
    const boughtLottos = this.#lottoMachine.getLottos();
    RenderingHandler.renderLottosList(boughtLottos);
  }

  // async #executeWinLottoNumber() {
  //   await this.#executeWinLottoNumbers();
  //   await this.#executeBonusNumber();
  // }

  // async #executeWinLottoNumbers() {
  //   try {
  //     const winLottoNumbers = await InputView.readWinLottoNumbers();
  //     this.#winLottoNumber = new WinLottoNumber(winLottoNumbers);
  //   } catch (err) {
  //     OutputView.printError(err.message);
  //     await this.#executeWinLottoNumbers();
  //   }
  // }

  // async #executeBonusNumber() {
  //   try {
  //     const bonusNumber = await InputView.readBonusNumber();
  //     this.#winLottoNumber.setBonusNumber(bonusNumber);
  //   } catch (err) {
  //     OutputView.printError(err.message);
  //     await this.#executeBonusNumber();
  //   }
  // }

  // #executeResult() {
  //   const winNumbersObj = this.#winLottoNumber.getWinLottoNumbers();
  //   const winLottos = this.#lottoMachine.getWinLottos(winNumbersObj);
  //   OutputView.printWinLottos(winLottos);

  //   const rateOfIncome = this.#lottoMachine.getRateOfIncome(winNumbersObj);
  //   OutputView.printRateOfIncome(rateOfIncome);
  // }

  // async #executeRetry() {
  //   try {
  //     const isRetry = await InputView.readIsRetryRun();
  //     await this.#initializeApp(isRetry);
  //   } catch (error) {
  //     OutputView.printError(error.message);
  //     await this.#executeRetry();
  //   }
  // }

  // async #initializeApp(isRetry) {
  //   if (!isRetry) return;
  //   this.#lottoMachine = undefined;
  //   this.#winLottoNumber = undefined;
  //   await this.run();
  // }
}
