import createDomElement from '../../../utils/createDomElement.js';

const $contentCountLabel = (count) => {
  const contentCountLabel = createDomElement('label', {
    className: 'lotto_count_label',
    textContent: `총 ${count}개를 구매했습니다.`,
  });

  return contentCountLabel;
};
export default $contentCountLabel;
