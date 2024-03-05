/* eslint-disable max-lines-per-function */
// 화면을 그리는 함수라 함수의 최대길이를 이 파일만큼은 지키기 어려울 것 같아서.. 해제했습니다.
import Dom from '../../utils/Dom';
import Condition from '../../constants/Condition';

const { LOTTO } = Condition;

const Render = {
  moneyInputAndSubmitButton() {
    Dom.createAppendTagNode({ target: '#read-money-form', tag: 'input', attribute: { id: 'read-money-input', type: 'text', placeholder: '금액' } });
    Dom.createAppendTagNode({
      target: '#read-money-form', tag: 'button', attribute: { id: 'read-money-form-submit', type: 'submit' }, text: '구입',
    });
  },

  winningNumbersFormInputAndSubmitButton() {
    Dom.createAppendTagNode({ target: '.read-winning-numbers', tag: 'h2', text: '지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.' });
    Dom.createAppendTagNode({ target: '.read-winning-numbers', tag: 'form', attribute: { id: 'winning-numbers-input-form' } });
    Dom.createAppendTagNode({ target: '#winning-numbers-input-form', tag: 'fieldset', attribute: { class: 'winning-numbers' } });
    Dom.createAppendTagNode({ target: '.winning-numbers', tag: 'legend', text: '당첨 번호' });
    Array.from({ length: LOTTO.NUMBER_LENGTH }).forEach((_, index) => {
      Dom.createAppendTagNode({ target: '.winning-numbers', tag: 'input', attribute: { id: `read-winning-numbers-input-${index}`, type: 'text', maxlength: '2' } });
    });
    Dom.createAppendTagNode({ target: '#winning-numbers-input-form', tag: 'fieldset', attribute: { class: 'bonus-number' } });
    Dom.createAppendTagNode({ target: '.bonus-number', tag: 'legend', text: '보너스 번호' });
    Dom.createAppendTagNode({
      target: '.bonus-number',
      tag: 'input',
      attribute: {
        id: 'read-bonus-number-input', type: 'text', maxlength: '2', disabled: true,
      },
    });
    Dom.createAppendTagNode({
      target: '.read-winning-numbers', tag: 'button', attribute: { id: 'read-winning-numbers-submit', type: 'submit', form: 'winning-numbers-input-form' }, text: '당첨번호 입력완료',
    });
  },

  restartButton() {
    Dom.createAppendTagNode({
      target: '.restart', tag: 'button', attribute: { id: 'restart-button' }, text: '다시 시작하기',
    });
    Dom.createAppendTagNode({ target: '.restart', tag: 'input', attribute: { id: 'restart-value', value: 'y' } });
  },
};

export default Render;
