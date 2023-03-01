import { $ } from '../dom/dom';
import toNumberFormatOfKor from '../utils/toNumberFormatOfKor';

const renderStatistics = (rankings, rewardRate) => {
  const lottoRewards = [
    { rank: 5, matchCount: '3개', reward: toNumberFormatOfKor(5000) },
    { rank: 4, matchCount: '4개', reward: toNumberFormatOfKor(50000) },
    { rank: 3, matchCount: '5개', reward: toNumberFormatOfKor(1500000) },
    { rank: 2, matchCount: '5개+보너스볼', reward: toNumberFormatOfKor(30000000) },
    { rank: 1, matchCount: '6개', reward: toNumberFormatOfKor(2000000000) },
  ];

  $('#winning-statistics').innerHTML = `
  <div id="winning-statistics-layout">
    <div id="winning-statistics-wapper">
      <div id="winning-statistics-out-button">ｘ</div>
      <div id="winning-statistics-title">🏆 당첨 통계 🏆</div>
      <table>
        <th>일치 갯수</th>
	      <th>당첨금</th>
	      <th>당첨 갯수</th>
          ${lottoRewards
            .map(({ rank, matchCount, reward }) => {
              const count = rankings.filter((ranking) => ranking === rank).length;
              return `
                <tr>
                    <td class="text">${matchCount}</td>
                    <td class="text">${reward}</td>
                    <td class="text">${count}개</td>
                </tr>
            `;
            })
            .join('')}
      </table>
      <div id="winning-statistics-reward-rate">당신의 총 수익률은 ${rewardRate}입니다.</div>
      <button class="button-basic">다시 시작하기</button>
    </div>
  </div>
  `;
};

export default renderStatistics;
