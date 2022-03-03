import lotto from '../../images/lotto.png';

export const lottoPurchaseCountTemplate = (count) => {
  return `
    총 ${count}개를 구매하였습니다.
  `;
};

export const lottoTemplate = (numbers) => {
  return `
    <li class="lotto-wrap">
      <img src=${lotto} />
      <p class="lotto-numbers hidden">${numbers.join(', ')}</p>
    </li>
  `;
};

export const lottoPurchaseResultTemplate = (lottoList) => {
  return `
    ${lottoList.map((lotto) => lottoTemplate([...lotto])).join('')}
  `;
};

export const lottoWinningNumberInputTemplate = () => {
  return `
    <section>
      <form id="lotto-match-result-form">
        <p>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요</p>
        <div>
          <label for="lotto-winning-number">당첨 번호</label>
          <input id="lotto-winning-number" class="lotto-winning-number-container" maxlength="2" />
          ${'<input class="lotto-winning-number-container" maxlength="2" />'.repeat(5)}
        </div>
        <div>
          <label for="lotto-winning-bonus-number">보너스 번호</label>
          <input id="lotto-winning-bonus-number" class="lotto-winning-number-container" maxlength="2" />
        </div>
        <button id="lotto-match-result-button" type="submit">결과 확인하기</button>
      </form>
    </section>
  `;
};

export const lottoResultModalTemplate = () => {
  return `
    <dialog id="lotto-result-dialog">
      <form method="dialog">
        <p>🏆당첨 통계🏆</p>
        <table>
          <thead>
            <tr>
              <th>일치 갯수</th>
              <th>당첨금</th>
              <th>당첨 갯수</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>3개</td>
              <td>5,000</td>
              <td><span id="three-matched-number"></span>개</td>
            </tr>
            <tr>
              <td>4개</td>
              <td>50,000</td>
              <td><span id="four-matched-number"></span>개</td>
            </tr>
            <tr>
              <td>5개</td>
              <td>1,500,000</td>
              <td><span id="five-matched-number"></span>개</td>
            </tr>
            <tr>
              <td>5개+보너스볼</td>
              <td>30,000,000</td>
              <td><span id="five-with-bonus-matched-number"></span>개</td>
            </tr>
            <tr>
              <td>6개</td>
              <td>2,000,000,000</td>
              <td><span id="six-matched-number"></span>개</td>
            </tr>
          </tbody>
        </table>
        <p>당신의 총 수익률은 <span id="profit-rate"></span>%입니다</p>
        <button id="restart-button">다시 시작하기</button>
      </form>
    </dialog>
  `;
};
