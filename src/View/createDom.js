export const createElementWithAttributes = (
  tag,
  { id = '', className = '', attributes = {}, textContent = '' } = {},
) => {
  const element = document.createElement(tag);

  if (id) {
    element.setAttribute('id', id);
  }

  if (className) {
    element.classList.add(...className.split(' '));
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  if (textContent) {
    element.textContent = textContent;
  }

  return element;
};

export const createWinningLottoForm = () => {
  const form = createElementWithAttributes('form', {
    id: 'winningLottoForm',
    className: 'winning-lotto-form',
  });

  const legend = createElementWithAttributes('legend', {
    className: 'winning-lotto-form-legend',
    textContent: '지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.',
  });

  const container = createElementWithAttributes('div', {
    className: 'winning-lotto-container',
  });

  // 당첨 번호 컨테이너
  const winningNumbersContainer = createElementWithAttributes('div', {
    className: 'winning-numbers-container',
  });
  const winningLabel = createElementWithAttributes('label', {
    attributes: { for: 'lottoNumber1' },
    textContent: '당첨 번호',
  });

  const winningInputContainer = createElementWithAttributes('div', {
    className: 'winning-numbers-input-container',
  });

  // 6개의 당첨 번호 input 생성
  for (let i = 1; i <= 6; i++) {
    const input = createElementWithAttributes('input', {
      className: 'winning-numbers-input',
      attributes: {
        id: `lottoNumber${i}`,
        name: 'winningNumber',
        required: true,
      },
    });
    winningInputContainer.appendChild(input);
  }

  winningNumbersContainer.appendChild(winningLabel);
  winningNumbersContainer.appendChild(winningInputContainer);

  // 보너스 번호 컨테이너
  const bonusContainer = createElementWithAttributes('div', {
    className: 'bonus-number-container',
  });
  const bonusLabel = createElementWithAttributes('label', {
    className: 'bonus-number-label',
    attributes: { for: 'bonusNumber' },
    textContent: '보너스 번호',
  });

  const bonusInputContainer = createElementWithAttributes('div', {
    className: 'bonus-number-input-container',
  });

  const bonusInput = createElementWithAttributes('input', {
    className: 'bonus-number-input',
    attributes: { id: 'bonusNumber', name: 'bonusNumber', required: true },
  });

  bonusInputContainer.appendChild(bonusInput);
  bonusContainer.appendChild(bonusLabel);
  bonusContainer.appendChild(bonusInputContainer);

  // 결과 확인 버튼
  const resultButton = createElementWithAttributes('button', {
    className: 'lotto-result-check-button',
    attributes: { type: 'submit' },
    textContent: '결과 확인하기',
  });

  // 컨테이너에 추가
  container.appendChild(winningNumbersContainer);
  container.appendChild(bonusContainer);

  // form에 추가
  form.appendChild(legend);
  form.appendChild(container);
  form.appendChild(resultButton);

  return form;
};
