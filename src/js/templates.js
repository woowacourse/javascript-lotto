export const generatePaymentSection = () => `
  <section id="payment-section">
    <h2 hidden>구입할 금액</h2>
    <label for="payment-input">구입할 금액을 입력해주세요.</label>
    <form class="payment-form">
      <input name="payment-input" id="payment-input" type="number" placeholder="금액" />
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
            <input type="number" class="winning-number-input" />
          </li>
          <li class="winning-number">
            <input type="number" class="winning-number-input" />
          </li>
          <li class="winning-number">
            <input type="number" class="winning-number-input" />
          </li>
          <li class="winning-number">
            <input type="number" class="winning-number-input" />
          </li>
          <li class="winning-number">
            <input type="number" class="winning-number-input" />
          </li>
          <li class="winning-number">
            <input type="number" class="winning-number-input" />
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
