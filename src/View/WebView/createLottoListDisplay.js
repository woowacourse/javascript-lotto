import { createElementWithAttributes } from './Utils/createElementWithAttributes.js';

const createDisplayLottoCount = (lottoCounts) => {
  return {
    tag: 'p',
    className: 'lotto-count-display',
    textContent: `총 ${lottoCounts}개를 구매했습니다.`,
  };
};

const createLottoNumbersList = (lottoNumbersList) => {
  return {
    tag: 'ul',
    children: lottoNumbersList.map((lottoNumbers) => ({
      tag: 'li',
      className: 'lotto',
      children: [
        { tag: 'span', className: 'lotto-ticket', textContent: '🎟️' },
        {
          tag: 'span',
          className: 'lotto-numbers',
          textContent: `${lottoNumbers.join(', ')}`,
        },
      ],
    })),
  };
};

export const createLottoListDisplay = (lottoCounts, lottoNumbersList) => {
  const article = createElementWithAttributes({
    tag: 'article',
    id: 'lottoListDisplay',
    className: 'lotto-list-display',
    children: [
      createDisplayLottoCount(lottoCounts),
      createLottoNumbersList(lottoNumbersList),
    ],
  });

  return article;
};
