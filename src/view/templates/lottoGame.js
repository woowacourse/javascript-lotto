export const pusrchaseCountMessage = (count) => `
  <p class="body">총 ${count}개를 구매하였습니다.</p>
`;

const eachLottoNumbers = (numbers) => `
  <p class="body lotto-ticket"><span>🎟️</span>${numbers.join(', ')}</p>
`;

export const enterWinNumberMessage = `
<p class="body">지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</p>
`;

const winNumberMessage = `
<p class="body">당첨 번호</p>
`;

const bonusNumberMessage = `
<p class="body">보너스 번호</p>
`;

export const numberInput = ({ name }) => `
  <input
    class="number-input"
    type="number"
    name=${name}
    min="1"
    max="45"
    required
  />`;

export const resultButton = `
  <button id="check-result" class="caption large-button" type="submit" disabled>결과 확인하기</button>
`;

export const numberTitleContainer = `
  <div class="flex-justify-between">
    ${winNumberMessage}
    ${bonusNumberMessage}
  </div>
`;

export const winningNumberContainer = ($$input) => `
  <div> 
    ${$$input};
  </div>
`;

export const numberEnterContainer = (
  $winNumberContainer,
  $bonusNumberInput
) => `
  <div class = "flex-justify-between number-container">
  ${$winNumberContainer}
  ${$bonusNumberInput}
  </div>
`;

export const ticketContainer = (lottos) =>
  `<div class="lotto-ticket-container">
    ${lottos.map((lotto) => eachLottoNumbers(lotto)).join('')}
  </div>`;
