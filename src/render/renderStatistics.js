import { $ } from '../dom/dom';

const renderStatistics = (rankings, rewardRate) => {
  const array = [
    [5, '3개', '5,000'],
    [4, '4개', '50,000'],
    [3, '5개', '1,500,000'],
    [2, '5개+보너스볼', '30,000,000'],
    [1, '6개', '2,000,000,000'],
  ];
  $('#winning-statistics').innerHTML = `
    <div>🏆 당첨 통계 🏆</div>
    <table>
        <th>일치 갯수</th>
	    <th>당첨금</th>
	    <th>당첨 갯수</th>
        ${array
          .map(([rank, matchCount, reward]) => {
            const count = rankings.filter((ranking) => ranking === rank).length;
            return `
                <tr>
                    <td>${matchCount}</td>
                    <td>${reward}</td>
                    <td>${count}개</td>
                </tr>
            `;
          })
          .join('')}
    </table>
    <div>당신의 총 수익률은 ${rewardRate}입니다.</div>
    <button>다시 시작하기</button>
  `;
};

export default renderStatistics;
