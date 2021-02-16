const getResultControlTemplate = (lottoItemCount) => {
  return `
    총 <span id="lotto-count">${lottoItemCount}</span>개를 구매하였습니다.
  `;
};

const getNumberListTemplate = (numberList) => {
  return numberList.join(', ');
};

const getResultItemListTemplate = (lottoList) => {
  let resultItemListTemplate = '';
  lottoList.forEach((lotto) => {
    resultItemListTemplate += `
      <div class="mx-1 text-4xl lotto-item">
      <span class="lotto-icon">🎟️</span> <span class="lotto-numbers">${getNumberListTemplate(
        lotto.numberList
      )}</span>
      </div>
    `;
  });

  return resultItemListTemplate;
};

export { getResultControlTemplate, getResultItemListTemplate };
