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
    lottoTitle.innerText = `🎱 내 번호 당첨 확인 🎱`;
    return lottoTitle;
  },

  makeMoneyForm: () => {
    const moneyForm = makeElementById('form', 'moneyForm');
    const moneyFormLabel = makeElementWithClassName('labe', 'moneyFormLabel');
    moneyFormLabel.innerText = '구입할 금액을 입력해주세요.';

    const moneyFormInputDiv = makeElementWithClassName('div', 'moneyFormInputDiv');
    const moneyFormInput = makeElementWithClassName('input', 'moneyFormInput');
    moneyFormInput.placeholder = '금액';
    moneyFormInput.name = 'money';
    const moneyFormButton = makeElementWithClassName('button', 'moneyFormButton');
    moneyFormButton.innerText = '구입';

    appendChildren(moneyFormInputDiv, [moneyFormInput, moneyFormButton]);
    appendChildren(moneyForm, [moneyFormLabel, moneyFormInputDiv]);
    return moneyForm;
  },
});

export default LottoComponent;
