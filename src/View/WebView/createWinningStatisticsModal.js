import { LOTTO_PRIZE_MONEY_DEFINITION } from '../../Domain/Constant/definition.js';
import { createElementWithAttributes } from './Utils/createElementWithAttributes.js';

const createLottoResultList = (lottoResult) => {
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

  const keys = Object.keys(message);

  const lottoResultListHeader = {
    tag: 'li',
    className: 'modal-content-lotto-result',
    children: ['일치 갯수', '당첨금', '당첨 갯수'].map((text) => ({
      tag: 'span',
      textContent: text,
    })),
  };

  return [
    lottoResultListHeader,
    ...keys.map((key) => ({
      tag: 'li',
      className: 'modal-content-lotto-result',
      children: message[key].map((text) => ({
        tag: 'span',
        textContent: text,
      })),
    })),
  ];
};

export const createWinningStatisticsModal = (
  lottoResult = {},
  lottoProfit = 0,
) => {
  return createElementWithAttributes({
    tag: 'div',
    id: 'modal',
    className: 'modal',
    children: [
      {
        tag: 'div',
        id: 'modalOverlay',
        className: 'modal-overlay',
      },
      {
        tag: 'div',
        id: 'modalContent',
        className: 'modal-content',
        children: [
          {
            tag: 'h3',
            className: 'text-subtitle',
            textContent: '🏆 당첨 통계 🏆',
            children: [
              {
                tag: 'button',
                id: 'modalCloseButton',
                className: 'modal-close-button',
                children: [
                  {
                    tag: 'img',
                    attributes: { src: './vector.svg', alt: 'close' },
                  },
                ],
              },
            ],
          },
          {
            tag: 'ul',
            className: 'modal-content-lotto-list-result',
            children: createLottoResultList(lottoResult),
          },
          {
            tag: 'span',
            className: 'modal-content-profit',
            textContent: `당신의 총 수익률은 ${Number(lottoProfit.toFixed(1)).toLocaleString()}%입니다.`,
          },
          {
            tag: 'button',
            id: 'modalRestartButton',
            className: 'modal-restart-button',
            textContent: '다시 시작하기',
          },
        ],
      },
    ],
  });
};
