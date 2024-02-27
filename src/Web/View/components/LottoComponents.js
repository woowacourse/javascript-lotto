import '../../css/lottoContainer.css';
import { appendChildren, makeElementWithClassName } from '../../utils';
import LottoNumbersComponents from './LottoNumbers';
import WinLottoComponents from './WinLottoComponents';

const LottoComponents = Object.freeze({
  makeLottoContainerElement: () => {
    const lottoContainer = makeElementWithClassName('div', 'lottoContainer');
    lottoContainer.appendChild(LottoComponents.makeLottoTitle());
    lottoContainer.appendChild(LottoComponents.makeMoneyForm());
    lottoContainer.appendChild(LottoNumbersComponents.makeLottoResults());
    lottoContainer.appendChild(WinLottoComponents.makeWinLottoForm());
    return lottoContainer;
  },

  makeLottoTitle: () => {
    const lottoTitle = makeElementWithClassName('div', 'lottoTitle');
    lottoTitle.innerText = `🎱 내 번호 당첨 확인 🎱`;
    return lottoTitle;
  },

  makeMoneyForm: () => {
    const moneyForm = makeElementWithClassName('form', 'moneyForm');
    const moneyFormLabel = makeElementWithClassName('labe', 'moneyFormLabel');
    moneyFormLabel.innerText = '구입할 금액을 입력해주세요.';

    const moneyFormInputDiv = makeElementWithClassName('div', 'moneyFormInputDiv');
    const moneyFormInput = makeElementWithClassName('input', 'moneyFormInput');
    moneyFormInput.placeholder = '금액';
    const moneyFormButton = makeElementWithClassName('button', 'moneyFormButton');
    moneyFormButton.innerText = '구입';

    moneyForm.addEventListener('submit', (event) => {
      event.preventDefault();
      // TODO: 금액 입력시 이벤트
      console.log('active');
    });

    appendChildren(moneyFormInputDiv, [moneyFormInput, moneyFormButton]);
    appendChildren(moneyForm, [moneyFormLabel, moneyFormInputDiv]);
    return moneyForm;
  },
});

export default LottoComponents;
