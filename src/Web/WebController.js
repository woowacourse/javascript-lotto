import LottoMachine from '../Domain/LottoMachine';
import WinLottoNumber from '../Domain/WinLottoNumber';

import RenderingHandler from './View/RenderingHandler';
import ResultModal from './View/components/ResultModal';

export default class WebController {
  #lottoMachine;

  #winLottoNumber;

  async run() {
    RenderingHandler.renderLottoComponents();

    this.#setMoneyFormEvent();
  }

  #setMoneyFormEvent() {
    document.getElementById('moneyForm').addEventListener('submit', (e) => {
      e.preventDefault();
      try {
        this.#executeMoneyFormSubmit(e);
      } catch (error) {
        alert(error.message);
      }
    });
  }

  #executeMoneyFormSubmit(e) {
    const money = Number(e.target.money.value);
    this.#lottoMachine = new LottoMachine(money);
    this.#executeLottos();
  }

  #executeLottos() {
    const boughtLottos = this.#lottoMachine.getLottos();
    RenderingHandler.renderLottosList(boughtLottos);
    this.#setWinLottoNumbersEvent();
  }

  #setWinLottoNumbersEvent() {
    document.getElementById('winLottoForm').addEventListener('submit', (e) => {
      e.preventDefault();
      try {
        this.#executeWinLottoNumberSubmit(e);
      } catch (error) {
        alert(error.message);
      }
    });
  }

  #executeWinLottoNumberSubmit(e) {
    const winNumbers = this.#executeWinLottoNumberSubmitWinNumbers(e);
    const bonusNumber = this.#executeWinLottoNumberSubmitBonusNumber(e);
    this.#executeWinLottoNumber(winNumbers, bonusNumber);
    this.#executeResult();
  }

  #executeWinLottoNumberSubmitWinNumbers(e) {
    return Array.from(e.target.winNumber).map((element) => {
      this.#checkNumber(element.value);
      return Number(element.value);
    });
  }

  #executeWinLottoNumberSubmitBonusNumber(e) {
    this.#checkNumber(e.target.bonusNumber.value);
    return Number(e.target.bonusNumber.value);
  }

  #executeWinLottoNumber(winNumbers, bonusNumber) {
    this.#executeWinLottoNumbers(winNumbers);
    this.#executeBonusNumber(bonusNumber);
  }

  #executeWinLottoNumbers(winLottoNumbers) {
    this.#winLottoNumber = new WinLottoNumber(winLottoNumbers);
  }

  #executeBonusNumber(bonusNumber) {
    this.#winLottoNumber.setBonusNumber(bonusNumber);
  }

  #checkNumber(input) {
    if (!input && input !== '0') {
      throw new Error('입력값 없음');
    }
  }

  #executeResult() {
    const winNumbersObj = this.#winLottoNumber.getWinLottoNumbers();
    const winLottos = this.#lottoMachine.getWinLottos(winNumbersObj);
    const rateOfIncome = this.#lottoMachine.getRateOfIncome(winNumbersObj);

    RenderingHandler.renderLottoResultModal(winLottos, rateOfIncome);
    this.#setModalResultEvent();
  }

  #setModalResultEvent() {
    this.#setModalResultCloseEvent();
    this.#setModalResultRetryEvent();
  }

  #setModalResultCloseEvent() {
    const modalCloseButton = document.querySelector('.modalCloseButton');
    modalCloseButton.addEventListener('click', (e) => {
      e.preventDefault();
      ResultModal.closeModal();
    });
  }

  #setModalResultRetryEvent() {
    const modalRetryButton = document.querySelector('.modalRetryButton');
    modalRetryButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.#executeRetry();
    });
  }

  #executeRetry() {
    RenderingHandler.resetRenderedComponents();
    this.run();
  }
}
