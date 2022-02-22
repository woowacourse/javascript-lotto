export const lottoPurchaseCountTemplate = (count) => {
  return `
    총 ${count}개를 구매하였습니다.
  `;
};

export const lottoTemplate = (numbers) => {
  return `
    <div>
      <div>🎟️</div>
      <p>${numbers.join(',')}</p>
    </div>
  `;
};

export const lottoPurchaseResultTemplate = (lottoList) => {
  return `
    ${lottoList.map((lotto) => lottoTemplate([...lotto])).join('')}
  `;
};