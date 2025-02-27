import createDomElement from '../utils/createDomElement';

const $lottoTitle = () => {
  const lottoTitle = createDomElement('b', {
    className: 'lotto_title title_style',
    textContent: '🎱 내 번호 당첨 확인 🎱',
  });

  return lottoTitle;
};

const $lottoSubTitle = () => {
  const lottoSubTitle = createDomElement('p', {
    className: 'lotto_subtitle',
    textContent: '구입할 금액을 입력해주세요.',
  });

  return lottoSubTitle;
};

const $lottoBuyFormInput = () => {
  const lottoBuyFormInput = createDomElement('input', {
    type: 'number',
    name: 'money',
    placeholder: '금액',
  });

  return lottoBuyFormInput;
};

const $lottoBuyFormButton = () => {
  const lottoBuyFormButton = createDomElement('button', {
    type: 'submit',
    textContent: '구입',
  });

  return lottoBuyFormButton;
};
const $lottoBuyForm = () => {
  const lottoBuyForm = createDomElement('form', {
    className: 'lotto_form',
    id: 'lottoBuyForm',
  });

  lottoBuyForm.appendChild($lottoBuyFormInput());
  lottoBuyForm.appendChild($lottoBuyFormButton());

  return lottoBuyForm;
};

const $lottoHeader = () => {
  const lottoHeader = createDomElement('div', {
    className: 'lotto_header',
  });

  lottoHeader.appendChild($lottoTitle());
  lottoHeader.appendChild($lottoSubTitle());
  lottoHeader.appendChild($lottoBuyForm());

  return lottoHeader;
};

export default $lottoHeader;
