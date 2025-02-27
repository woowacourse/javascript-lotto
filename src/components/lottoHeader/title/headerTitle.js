import createDomElement from '../../../utils/createDomElement.js';

const $headerTitle = () => {
  const headerTitle = createDomElement('b', {
    className: 'lotto_title title_style',
    textContent: '🎱 내 번호 당첨 확인 🎱',
  });

  return headerTitle;
};

export default $headerTitle;
