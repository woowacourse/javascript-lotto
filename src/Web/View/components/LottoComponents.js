import '../../css/lottoContainer.css';
import { appendChildren, makeElementById, makeElementWithClassName } from '../../utils';

const LottoComponent = Object.freeze({
  makeLottoContainerElement: () => {
    const lottoContainer = makeElementById('div', 'lottoContainer');
    appendChildren(lottoContainer, [LottoComponent.makeLottoTitle(), LottoComponent.makeMoneyForm()]);
    const lottoResultContainer = makeElementById('div', 'lottoResultContainer');
    lottoContainer.appendChild(lottoResultContainer);
    return lottoContainer;
  },

  makeLottoTitle: () => {
    const lottoTitle = makeElementWithClassName('div', 'lottoTitle');
    lottoTitle.innerHTML = `<h2>🎱 내 번호 당첨 확인 🎱</h2>`;
    return lottoTitle;
  },

  makeMoneyForm: () => {
    const moneyForm = makeElementById('form', 'moneyForm');
    const moneyFormInputDiv = makeElementWithClassName('div', 'moneyFormInputDiv');

    appendChildren(moneyFormInputDiv, [LottoComponent.makeMoneyFormInput(), LottoComponent.makeMoneyFormButton()]);
    appendChildren(moneyForm, [LottoComponent.makeMoneyFormLabel(), moneyFormInputDiv]);
    return moneyForm;
  },

  makeMoneyFormLabel: () => {
    const moneyFormLabel = makeElementWithClassName('label', 'moneyFormLabel');
    moneyFormLabel.innerText = '구입할 금액을 입력해주세요...';
    moneyFormLabel.htmlFor = 'lottoMoney';
    return moneyFormLabel;
  },

  makeMoneyFormInput: () => {
    const moneyFormInput = makeElementWithClassName('input', 'moneyFormInput');
    moneyFormInput.placeholder = '금액';
    moneyFormInput.name = 'money';
    moneyFormInput.id = 'lottoMoney';
    return moneyFormInput;
  },
  makeMoneyFormButton: () => {
    const moneyFormButton = makeElementWithClassName('button', 'moneyFormButton');
    moneyFormButton.innerText = '구입';
    return moneyFormButton;
  },
});

export default LottoComponent;
