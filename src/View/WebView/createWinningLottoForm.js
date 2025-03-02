import { createElementWithAttributes } from './Utils/createElementWithAttributes.js';

const createWinningNumbersInputs = () => {
  return {
    tag: 'div',
    className: 'winning-numbers-container',
    children: [
      {
        tag: 'label',
        attributes: { for: 'lottoNumber1' },
        textContent: '당첨 번호',
      },
      {
        tag: 'div',
        className: 'winning-numbers-input-container',
        children: Array.from({ length: 6 }, (_, i) => ({
          tag: 'input',
          className: 'winning-numbers-input',
          id: `lottoNumber${i + 1}`,
          attributes: {
            name: 'winningNumber',
            required: true,
            minLength: 1,
            maxLength: 2,
          },
        })),
      },
    ],
  };
};

const createBonusNumberInput = () => {
  return {
    tag: 'div',
    className: 'bonus-number-container',
    children: [
      {
        tag: 'label',
        className: 'bonus-number-label',
        attributes: { for: 'bonusNumber' },
        textContent: '보너스 번호',
      },
      {
        tag: 'div',
        className: 'bonus-number-input-container',
        children: [
          {
            tag: 'input',
            className: 'bonus-number-input',
            attributes: {
              id: 'bonusNumber',
              name: 'bonusNumber',
              required: true,
              minLength: 1,
              maxLength: 2,
            },
          },
        ],
      },
    ],
  };
};

export const createWinningLottoForm = () => {
  return createElementWithAttributes({
    tag: 'form',
    id: 'winningLottoForm',
    className: 'winning-lotto-form',
    children: [
      {
        tag: 'h3',
        className: 'winning-lotto-form-instruction',
        textContent: '지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.',
      },
      {
        tag: 'div',
        className: 'winning-lotto-container',
        children: [createWinningNumbersInputs(), createBonusNumberInput()],
      },

      {
        tag: 'button',
        className: 'lotto-result-check-button',
        textContent: '결과 확인하기',
      },
    ],
  });
};
