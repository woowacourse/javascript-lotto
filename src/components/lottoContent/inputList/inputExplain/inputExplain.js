import createDomElement from '../../../../utils/createDomElement.js';

const $inputExplain = () => {
  const inputExplain = createDomElement('p', {
    textContent: '지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.',
  });

  return inputExplain;
};

export default $inputExplain;
