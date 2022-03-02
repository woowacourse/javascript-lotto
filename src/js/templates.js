export const generatePaymentSection = () => `
  <section id="payment-section">
    <h2 hidden>구입할 금액</h2>
    <label for="payment-input">구입할 금액을 입력해주세요.</label>
    <form class="payment-form">
      <input name="payment-input" id="payment-input" type="number" placeholder="금액" min="1000"/>
      <button id="payment-button">구입</button>
    </form>
  </section>
  `;

const generatePurchasedLotto = (lotto) => `
  <li class="lotto">
    <p class="lotto-icon">🎟️</p>
    <p class="lotto-number invisible">${lotto.join(', ')}</p>
  </li>
  `;

export const generatePurchasedSection = (lottoList) => `
  <section id="purchased-lotto-list-section">
    <h2 hidden>구입한 로또 목록</h2>
    <div class="lotto-list-container">
      <p class="purchased-total-count">총 ${
        lottoList.length
      }개를 구매하였습니다.</p>
      <ul id="lotto-list">
        ${lottoList.map((lotto) => generatePurchasedLotto(lotto)).join('')}
      </ul>
    </div>
    <div class="lotto-list-toggle-container">
      <p>번호 보기</p>
      <button id="lotto-list-toggle-button"></button>
    </div>
  </section>
  `;

export const generateWinningNumberSection = () => `
  <section id="last-week-winning-number-section">
    <h2 hidden>지난 주 당첨 번호</h2>
    <p>지난 주 당첨 번호 6개와 보너스 번호 1개를 입력해주세요.</p>
    <div class="winning-number-container">
      <div class="">
        <p>당첨 번호</p>
        <ul id="winning-number-list">
          <li class="winning-number">
            <input type="number" class="winning-number-input" min="1" max="45"/>
          </li>
          <li class="winning-number">
            <input type="number" class="winning-number-input" min="1" max="45"/>
          </li>
          <li class="winning-number">
            <input type="number" class="winning-number-input" min="1" max="45"/>
          </li>
          <li class="winning-number">
            <input type="number" class="winning-number-input" min="1" max="45"/>
          </li>
          <li class="winning-number">
            <input type="number" class="winning-number-input" min="1" max="45"/>
          </li>
          <li class="winning-number">
            <input type="number" class="winning-number-input" min="1" max="45"/>
          </li>
        </ul>
      </div>
      <div class="bonus-number-container">
        <p>보너스 번호</p>
        <input type="number" id="bonus-number-input" />
      </div>
    </div>
  </section>
`;

export const generateResultCheckingSection = () => `
  <section id="result-checking-section">
    <h2 hidden>결과 확인</h2>
    <button id="result-checking-button">결과 확인하기</button>
  </section>
`;

export const generateModal = (result, earning) => `
  <div class="modal-background"> 
      <div class="modal">
        <div class="modal-header">
          <button id="modal-close-button">X</button>
        </div>
        <div class="modal-body">
          <h2 class="modal-title">🏆 당첨 통계 🏆</h2>
          <table>
            <th>일치 개수</th>
            <th>당첨금</th>
            <th>당첨 개수</th>
            <tr>
              <td>3개</td>
              <td>5,000</td>
              <td>${result[0]}개</td>
            </tr>
            <tr>
              <td>4개</td>
              <td>50,000</td>
              <td>${result[1]}개</td>
            </tr>
            <tr>
              <td>5개</td>
              <td>1,500,000</td>
              <td>${result[2]}개</td>
            </tr>
            <tr>
              <td>5개+보너스볼</td>
              <td>30,000,000</td>
              <td>${result[3]}개</td>
            </tr>
            <tr>
              <td>6개</td>
              <td>2,000,000,000</td>
              <td>${result[4]}개</td>
            </tr>
          </table>
          <p class="modal-earning-weight">당신의 총 수익률은 ${earning}%입니다</p>
          <button id="restart">다시 시작하기</button>
        </div>
      </div> 
    </div>
  `;
