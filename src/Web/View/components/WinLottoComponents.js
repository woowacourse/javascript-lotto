import '../../css/winLottoNumbers.css';
import { appendChildren, makeElementById, makeElementWithClassName } from '../../utils';

const WinLottoComponents = Object.freeze({
  makeWinLottoForm: () => {
    const winLottoForm = makeElementById('form', 'winLottoForm');
    const winLottoFormLabel = makeElementWithClassName('label', 'winLottoFormLabel');
    winLottoFormLabel.innerText = '지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.';

    const winLottoFormButton = WinLottoComponents.makeWinLottoFormButton();

    appendChildren(winLottoForm, [
      winLottoFormLabel,
      WinLottoComponents.makeWinLottoAndBonusNumbers(),
      winLottoFormButton,
    ]);
    return winLottoForm;
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
    const winNumberTitle = makeElementWithClassName('div', 'winNumberTitle');
    winNumberTitle.innerText = '당첨 번호';

    appendChildren(winNumbersDiv, [winNumberTitle, WinLottoComponents.makeWinLottoInputs()]);

    return winNumbersDiv;
  },

  makeWinLottoInputs: () => {
    const winLottoInputs = makeElementWithClassName('div', 'winLottoInputs');
    appendChildren(
      winLottoInputs,
      Array.from({ length: 6 }, () => {
        const input = makeElementWithClassName('input', 'winLottoInput');
        input.type = 'number';
        input.max = 45;
        input.min = 1;
        input.name = `winNumber`;
        return input;
      }),
    );
    return winLottoInputs;
  },

  makeBonusLottoNumber: () => {
    const bonusNumberDiv = makeElementWithClassName('div', 'bonusLottoNumberDiv');
    const bonusNumberTitle = makeElementWithClassName('div', 'bonusNumberTitle');
    bonusNumberTitle.innerText = '보너스 번호';
    const bonusNumberInput = makeElementWithClassName('input', 'winLottoInput');
    bonusNumberInput.name = 'bonusNumber';
    appendChildren(bonusNumberDiv, [bonusNumberTitle, bonusNumberInput]);
    return bonusNumberDiv;
  },

  makeWinLottoFormButton: () => {
    const winLottoFormButton = makeElementWithClassName('button', 'winLottoFormButton');
    winLottoFormButton.innerText = '결과 확인하기';
    // TODO: 당첨 번호 입력 이벤트 추가
    return winLottoFormButton;
  },
});

export default WinLottoComponents;
