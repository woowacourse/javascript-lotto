export const pusrchaseCountMessage = (count) => `
  <p class="body">총 ${count}개를 구매하였습니다.</p>
`;

export const eachLottoNumbers = (numbers) => `
  <p class="body lotto-ticket"><span>🎟️</span>${numbers.join(', ')}</p>
`;

export const enterWinNumberMessage = `
<p class="body">지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</p>
`;

export const winNumberMessage = `
<p class="body">당첨 번호</p>
`;

export const bonusNumberMessage = `
<p class="body">보너스 번호</p>
`;

export const numberInput = (name) => `
  <input
    class="number-input"
    type="number"
    name=${name}
    min="1"
    max="45"
    required
  />`;
