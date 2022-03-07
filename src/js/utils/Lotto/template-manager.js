import { DOM_NAME } from '../../constants/selector';
import { LOTTO_SETTING } from '../../constants/setting';

export const makeLottosCountTemplate = (count) => `총 ${count}개를 구매하였습니다.`;

export const makeLottoTemplate = (numbers) => `
  <div class="${DOM_NAME.CLASS.LOTTO_ITEM}"><span>🎟️</span> <span class="${DOM_NAME.CLASS.LOTTO_ITEM_NUMBER}">${numbers}</span></div>
  `;

export const makeLottoResultTemplate = (winningRankCountList) => {
  const { WINNING_NUMBER_UNIT, WINNING_AMOUNT_UNIT } = LOTTO_SETTING;

  return winningRankCountList
    .map(
      (count, rankIndex) =>
        `<tr>
        <td>${WINNING_NUMBER_UNIT[rankIndex]}</td>
        <td>${WINNING_AMOUNT_UNIT[rankIndex].toLocaleString()}</td>
        <td${(count > 0 && ' class="bold"') || ''}>${count}개</td$>
      </tr>`
    )
    .join('');
};

export const makeLottoResultProfitRatioText = (playerLottoProfitRatio) =>
  `당신의 총 수익률은 ${playerLottoProfitRatio.toLocaleString()}% 입니다.`;
