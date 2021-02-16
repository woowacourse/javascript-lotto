const getResultControlTemplate = (lottoItemCount) => {
  return `
  <label class="flex-auto my-0">
    총 <span id="lotto-count">${lottoItemCount}</span>개를 구매하였습니다.
  </label>
  <div class="flex-auto d-flex justify-end pr-1">
    <label class="switch">
      <input type="checkbox" id="lotto-numbers-toggle-button" />
      <span class="text-base font-normal">번호보기</span>
    </label>
  </div>
  `;
};

const getResultItemListTemplate = (lottoItemCount, numberList) => {
  return `
    <div class="mx-1 text-4xl lotto-item">
      🎟️ <span class="lotto-numbers">${
        numberList ? numberList.join(', ') : ''
      }</span>
    </div>
  `.repeat(lottoItemCount);
};

export { getResultControlTemplate, getResultItemListTemplate };
