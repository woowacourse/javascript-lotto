import createDomElement from '../../../utils/createDomElement.js';

const $headerSubTitle = () => {
  const headerSubTitle = createDomElement('p', {
    className: 'lotto_subtitle',
    textContent: '구입할 금액을 입력해주세요.',
  });

  return headerSubTitle;
};

export default $headerSubTitle;
