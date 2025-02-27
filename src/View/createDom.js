import { LOTTO_PRIZE_MONEY_DEFINITION } from '../Domain/Constant/definition';

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
        minLength: 1,
        maxLength: 2,
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
    attributes: {
      id: 'bonusNumber',
      name: 'bonusNumber',
      required: true,
      minLength: 1,
      maxLength: 2,
    },
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

export const createModal = (lottoResult = {}, lottoProfit = 0) => {
  const modal = createElementWithAttributes('div', {
    className: 'modal',
  });

  const overlay = createElementWithAttributes('div', {
    className: 'modal-overlay',
  });

  const modalContent = createElementWithAttributes('div', {
    className: 'modal-content',
  });

  const titleContainer = createElementWithAttributes('span', {
    className: 'text-subtitle',
    textContent: '🏆 당첨 통계 🏆',
  });

  const closeButton = createElementWithAttributes('button', {
    type: 'button',
    className: 'modal-close-button',
  });

  const closeIcon = createElementWithAttributes('img', {
    attributes: { src: '/vector.svg', alt: 'close' },
  });

  closeButton.appendChild(closeIcon);
  titleContainer.appendChild(closeButton);

  const lottoList = createElementWithAttributes('ul', {
    className: 'modal-content-lotto-list-result',
  });

  // 필수 리스트 아이템
  const headerItem = createElementWithAttributes('li', {
    className: 'modal-content-lotto-result',
  });
  ['일치 갯수', '당첨금', '당첨 갯수'].forEach((text) => {
    headerItem.appendChild(
      createElementWithAttributes('span', { textContent: text }),
    );
  });
  lottoList.appendChild(headerItem);

  const message = {
    FIRST_PRIZE: [
      '6개',
      LOTTO_PRIZE_MONEY_DEFINITION.FIRST_PRIZE.toLocaleString(),
      `${lottoResult.FIRST_PRIZE}개`,
    ],
    SECOND_PRIZE: [
      '5개+보너스 볼',
      LOTTO_PRIZE_MONEY_DEFINITION.SECOND_PRIZE.toLocaleString(),
      `${lottoResult.SECOND_PRIZE}개`,
    ],
    THIRD_PRIZE: [
      '5개',
      LOTTO_PRIZE_MONEY_DEFINITION.THIRD_PRIZE.toLocaleString(),
      `${lottoResult.THIRD_PRIZE}개`,
    ],
    FOURTH_PRIZE: [
      '4개',
      LOTTO_PRIZE_MONEY_DEFINITION.FOURTH_PRIZE.toLocaleString(),
      `${lottoResult.FOURTH_PRIZE}개`,
    ],
    FIFTH_PRIZE: [
      '3개',
      LOTTO_PRIZE_MONEY_DEFINITION.FIFTH_PRIZE.toLocaleString(),
      `${lottoResult.FIFTH_PRIZE}개`,
    ],
  };
  const keys = [
    'FIFTH_PRIZE',
    'FOURTH_PRIZE',
    'THIRD_PRIZE',
    'SECOND_PRIZE',
    'FIRST_PRIZE',
  ];

  // 동적으로 추가되는 로또 결과 리스트
  keys.forEach((key) => {
    const resultItem = createElementWithAttributes('li', {
      className: 'modal-content-lotto-result',
    });
    const [match, prize, count] = message[key];
    [match, prize, count].forEach((text) => {
      resultItem.appendChild(
        createElementWithAttributes('span', { textContent: text }),
      );
    });
    lottoList.appendChild(resultItem);
  });

  modalContent.append(titleContainer, lottoList);
  modal.append(overlay, modalContent);

  return modal;
};
