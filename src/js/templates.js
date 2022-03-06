const createTemplate = {
  paymentSection() {
    return `
    <h1>🎱 행운의 로또</h1>
    <section id="payment-section">
      <h2 hidden>구입할 금액</h2>
      <label for="payment-input">구입할 금액을 입력해주세요.</label>
      <form class="payment-form">
        <input name="payment-input" id="payment-input" type="number" placeholder="금액" min="1000" step="1000" required autofocus />
        <button id="payment-button">구입</button>
      </form>
    </section>
    `;
  },
  purchasedSection(lottoList) {
    return `
    <section id="purchased-lotto-list-section">
      <h2 hidden>구입한 로또 목록</h2>
      <div class="lotto-list-container">
        <p class="purchased-total-count">총 ${
          lottoList.length
        }개를 구매하였습니다.</p>
        <ul id="lotto-list">
          ${lottoList
            .map((lotto) => this.lottoTicketAndNumberElement(lotto))
            .join('')}
        </ul>
      </div>
      <div class="lotto-list-toggle-container">
        <p>번호 보기</p>
        <button id="lotto-list-toggle-button"></button>
      </div>
    </section>
    `;
  },
  lottoTicketAndNumberElement(lotto) {
    return `
    <li class="lotto">
      <p class="lotto-ticket">🎟️</p>
      <p class="lotto-number invisible">${lotto.join(', ')}</p>
    </li>
    `;
  },
  lastWeekWinningNumberSection() {
    return `
    <section id="last-week-winning-number-section">
      <h2 hidden>지난 주 당첨 번호</h2>
      <p>지난 주 당첨 번호 6개와 보너스 번호 1개를 입력해주세요.</p>
      <form class="winning-number-form">
        <div class="winning-number-container">
          <div class="">
            <p>당첨 번호</p>
            <ul id="last-week-number-list">
              <li class="last-week-number">
                <label for="last-week-first-input" hidden>지난주 당첨 첫 번째 번호</label>
                <input type="number" name="last-week-first-input" class="last-week-number-input winning-numbers" data-input-id="1" min="1" max="45" maxlength="2" required />
              </li>
              <li class="last-week-number">
                <label for="last-week-second-input" hidden>지난주 당첨 두 번째 번호</label>
                <input type="number" name="last-week-second-input" class="last-week-number-input winning-numbers" data-input-id="2" min="1" max="45" maxlength="2" required />
              </li>
              <li class="last-week-number">
                <label for="last-week-third-input" hidden>지난주 당첨 세 번째 번호</label>
                <input type="number" name="last-week-third-input" class="last-week-number-input winning-numbers" data-input-id="3" min="1" max="45" maxlength="2" required />
              </li>
              <li class="last-week-number">
                <label for="last-week-forth-input" hidden>지난주 당첨 네 번째 번호</label>
                <input type="number" name="last-week-forth-input" class="last-week-number-input winning-numbers" data-input-id="4" min="1" max="45" maxlength="2" required />
              </li>
              <li class="last-week-number">
                <label for="last-week-fifth-input" hidden>지난주 당첨 다섯 번째 번호</label>
                <input type="number" name="last-week-fifth-input" class="last-week-number-input winning-numbers" data-input-id="5" min="1" max="45" maxlength="2" required />
              </li>
              <li class="last-week-number">
                <label for="last-week-sixth-input" hidden>지난주 당첨 여섯 번째 번호</label>
                <input type="number" name="last-week-sixth-input" class="last-week-number-input winning-numbers" data-input-id="6" min="1" max="45" maxlength="2" required />
              </li>
            </ul>
          </div>
          <div class="last-week-bonus-number-container">
            <p>보너스 번호</p>
            <label for="last-week-bonus-input" hidden>지난주 당첨 보너스 번째 번호</label>
            <input type="number" class="last-week-bonus-number-input winning-numbers" data-input-id="7" min="1" max="45" maxlength="2" required />
          </div>
        </div>
        <button id="result-checking-button" class="disabled" disabled>결과 확인하기</button>
      </form>
    </section>
  `;
  },
  lottoResultSection(winningCount, rateOfReturn) {
    return `
    <div id="cover-the-background"></div>
    <section id="lotto-result-section">
      <button id="exit-button"></button>
      <h2 hidden>구매한 로또 결과</h2>
      <table>
      <caption id="lotto-result-table-caption">
        🏆 당첨 통계 🏆
      </caption>
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
            <td class="fifth-winning-count">${winningCount.fifthWinner}개</td>
          </tr>
          <tr>
            <td>4개</td>
            <td>50,000</td>
            <td class="forth-winning-count">${winningCount.forthWinner}개</td>
          </tr>
          <tr>
            <td>5개</td>
            <td>1,500,000</td>
            <td class="third-winning-count">${winningCount.thirdWinner}개</td>
          </tr>
          <tr>
            <td>5개+보너스볼</td>
            <td>30,000,000</td>
            <td class="second-winning-count">${winningCount.secondWinner}개</td>
          </tr>
          <tr>
            <td>6개</td>
            <td>2,000,000,000</td>
            <td class="first-winning-count">${winningCount.firstWinner}개</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="rate-of-return">당신의 총 수익률은 ${rateOfReturn}%입니다.</td>
          </tr>
        </tfoot>
      </table>
      <button id="restart-button">다시 시작하기</button>
    </section>
    `;
  },
};

export default createTemplate;
