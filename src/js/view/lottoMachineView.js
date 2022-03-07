import { DISABLED_PURCHASE_BUTTON_TEXT, LOTTO_IMAGE, CLASSNAME } from '../constants/constants';
import {
  createElementWithClassName,
  handleOnInput,
  initInputElement,
  selectDom,
} from '../utils/utils';

import LottoGenerator from '../model/lottoGenerator';
import WinningCalculator from '../model/winningCalculator';

class LottoMachineView {
  constructor() {
    this.lottoGenerator = new LottoGenerator();
    this.winningCalculator = new WinningCalculator();

    this.cashInput = selectDom('.cash-input');
    this.cashInputButton = selectDom('.cash-input-button');

    this.purchasedLottoSection = selectDom('.purchased-lotto-section');
    this.purchasedLottoCountText = selectDom(
      '.purchased-lotto-count-text',
      this.purchasedLottoSection
    );
    this.lottoNumberContainer = selectDom('.lotto-grid', this.purchasedLottoSection);
    this.showNumberToggleButton = selectDom(
      '.show-number-toggle-button',
      this.purchasedLottoSection
    );

    this.winningNumberSection = selectDom('.winning-number-section');
    this.winningNumberInputs = this.winningNumberSection.querySelectorAll('.winning-number-input');
    this.bonusNumberInput = selectDom('.bonus-number-input', this.winningNumberSection);
    this.resultButton = selectDom('.result-button', this.winningNumberSection);

    this.modal = selectDom('.modal');
    this.winningCountElements = this.modal.querySelectorAll('.winning-count');
    this.yieldResultText = selectDom('.yield-result-text', this.modal);
    this.modalCloseButton = selectDom('.close-button', this.modal);
    this.restartButton = selectDom('.restart-button', this.modal);

    this.cashInputButton.addEventListener('click', this.#onCashInputButtonClick);
  }

  #onCashInputButtonClick = (e) => {
    e.preventDefault();
    try {
      this.lottoGenerator.buyLotto(this.cashInput.value);

      this.#disableCashInputSection();
      this.#renderLottos(this.lottoGenerator.lottos);

      this.winningNumberSection.addEventListener('keypress', this.#onInputNumberType);
      this.showNumberToggleButton.addEventListener('click', this.#onShowNumberToggleButtonClick);
      this.resultButton.addEventListener('click', this.#onResultButtonClick);
    } catch (error) {
      this.#initCashInputView();
      alert(error.message);
    }
  };

  #onShowNumberToggleButtonClick = ({ target: { checked: isVisible } }) => {
    this.#toggleLottoNumbersShow(isVisible);
  };

  #onInputNumberType = (e) => {
    if (e.target.className === CLASSNAME.WINNing_NUMBER_INPUT) {
      handleOnInput(e.target, 2);
    }
  };

  #onResultButtonClick = (e) => {
    e.preventDefault();
    try {
      this.winningCalculator.calculateWinningResult(
        Array.from(this.winningNumberInputs).map((input) => input.value),
        this.bonusNumberInput.value,
        this.lottoGenerator.lottos
      );

      this.#showResultModal();

      this.modalCloseButton.addEventListener('click', this.#onModalCloseButtonClick);
      this.restartButton.addEventListener('click', this.#onRestartButtonClick);
    } catch (error) {
      this.#initBonusNumberInputView();
      this.winningNumberInputs[0].focus();
      alert(error.message);
    }
  };

  #onModalCloseButtonClick = () => {
    this.modal.classList.remove('show');
  };

  #onRestartButtonClick = (e) => {
    e.preventDefault();

    this.lottoGenerator.initLottos();
    this.winningCalculator.initWinningCalcualtor();

    this.modal.classList.remove('show');
    this.#disableCashInputSection(false);
    this.purchasedLottoSection.classList.add(CLASSNAME.HIDE);
    this.winningNumberSection.classList.add(CLASSNAME.HIDE);
    this.#initBonusNumberInputView();
    this.#initCashInputView();
  };

  #initBonusNumberInputView() {
    initInputElement(this.bonusNumberInput);
    this.winningNumberInputs.forEach((input) => {
      initInputElement(input);
    });
  }

  #initCashInputView() {
    initInputElement(this.cashInput);
    this.cashInput.focus();
  }

  #showResultModal() {
    this.modal.classList.add('show');

    this.winningCountElements.forEach((winningCount) => {
      winningCount.textContent = `${
        this.winningCalculator.totalWinningCount[winningCount.dataset.winningAmount]
      }개`;
    });
    this.yieldResultText.textContent = `당신의 총 수익률은 ${this.winningCalculator.totalYield}%입니다.`;
  }

  #toggleLottoNumbersShow(isVisible) {
    const { classList: lottoNumberContainerClassList } = this.lottoNumberContainer;
    if (isVisible) {
      lottoNumberContainerClassList.remove(CLASSNAME.HIDE_NUMBERS);
      return;
    }
    lottoNumberContainerClassList.add(CLASSNAME.HIDE_NUMBERS);
  }

  #disableCashInputSection(shouldDisable = true) {
    this.cashInput.disabled = shouldDisable;
    this.cashInputButton.disabled = shouldDisable;
    this.cashInputButton.textContent = shouldDisable ? DISABLED_PURCHASE_BUTTON_TEXT : '구입';
  }

  #renderLottos(lottos) {
    this.purchasedLottoSection.classList.remove(CLASSNAME.HIDE);
    this.winningNumberSection.classList.remove(CLASSNAME.HIDE);

    this.lottoNumberContainer.innerHTML = '';
    this.purchasedLottoCountText.textContent = `총 ${lottos.length}개를 구매하였습니다.`;
    this.lottoNumberContainer.append(...this.#generateLottoElementsArray(lottos));
  }

  #generateLottoElementsArray(lottos) {
    return lottos.map((lotto) => this.#generateLottoElement(lotto));
  }

  #generateLottoElement(lotto) {
    const lottoElement = createElementWithClassName('div', CLASSNAME.LOTTO);

    const lottoImage = createElementWithClassName('p', CLASSNAME.LOTTO_IMAGE);
    lottoImage.textContent = LOTTO_IMAGE;

    const lottoNumbers = createElementWithClassName('p', CLASSNAME.LOTTO_NUMBERS);
    lottoNumbers.textContent = Array.from(lotto.lottoNumberSet).join(', ');

    lottoElement.append(lottoImage, lottoNumbers);
    return lottoElement;
  }
}

export default LottoMachineView;
