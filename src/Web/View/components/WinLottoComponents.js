import { LOTTO_NUMBER_RANGE, LOTTO_LENGTH } from '../../../Domain/LottoNumber';
import '../../css/winLottoNumbers.css';
import { appendChildren, makeElementById, makeElementWithClassName } from '../../utils';

const WinLottoComponents = Object.freeze({
  makeWinLottoForm: () => {
    const winLottoForm = makeElementById('form', 'winLottoForm');
    appendChildren(winLottoForm, [
      WinLottoComponents.makeWinLottoFormDiv(),
      WinLottoComponents.makeWinLottoAndBonusNumbers(),
      WinLottoComponents.makeWinLottoFormButton(),
    ]);
    return winLottoForm;
  },

  makeWinLottoFormDiv: () => {
    const winLottoFormDiv = makeElementWithClassName('div', 'winLottoFormDiv');
    winLottoFormDiv.innerText = '지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.';
    winLottoFormDiv.htmlFor = 'winLottoNumber';
    return winLottoFormDiv;
  },

  makeWinLottoAndBonusNumbers: () => {
    const numbersContainer = makeElementWithClassName('div', 'numbersContainer');
    appendChildren(numbersContainer, [
      WinLottoComponents.makeWinLottoNumbers(),
      WinLottoComponents.makeBonusLottoNumber(),
    ]);
    return numbersContainer;
  },

  makeWinLottoNumbers: () => {
    const winNumbersDiv = makeElementWithClassName('div', 'winNumbersDiv');
    const winNumberLabel = makeElementWithClassName('label', 'winNumberLabel');
    winNumberLabel.innerText = '당첨 번호';
    winNumberLabel.htmlFor = 'winNumber';

    appendChildren(winNumbersDiv, [winNumberLabel, WinLottoComponents.makeWinLottoInputs()]);
    return winNumbersDiv;
  },

  makeWinLottoInputs: () => {
    const winLottoInputs = makeElementWithClassName('div', 'winLottoInputs');
    appendChildren(
      winLottoInputs,
      Array.from({ length: LOTTO_LENGTH }, () => WinLottoComponents.makeWinLottoInput('winNumber')),
    );
    return winLottoInputs;
  },

  makeBonusLottoNumber: () => {
    const bonusNumberDiv = makeElementWithClassName('div', 'bonusLottoNumberDiv');
    const bonusNumberLabel = makeElementWithClassName('label', 'bonusNumberLabel');
    bonusNumberLabel.innerText = '보너스 번호';
    bonusNumberLabel.htmlFor = 'bonusNumber';
    const bonusNumberInput = WinLottoComponents.makeWinLottoInput('bonusNumber');
    appendChildren(bonusNumberDiv, [bonusNumberLabel, bonusNumberInput]);
    return bonusNumberDiv;
  },

  makeWinLottoInput: (id) => {
    const winLottoInput = makeElementWithClassName('input', 'winLottoInput');
    winLottoInput.id = id;
    winLottoInput.name = id;
    winLottoInput.type = 'number';
    winLottoInput.max = LOTTO_NUMBER_RANGE.MAX;
    winLottoInput.min = LOTTO_NUMBER_RANGE.MIN;
    return winLottoInput;
  },

  makeWinLottoFormButton: () => {
    const winLottoFormButton = makeElementWithClassName('button', 'winLottoFormButton');
    winLottoFormButton.innerText = '결과 확인하기';
    return winLottoFormButton;
  },
});

export default WinLottoComponents;
