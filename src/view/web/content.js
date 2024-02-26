export default function content(element) {
  const render = (element) => {
    element.innerHTML = `
      <section id="lotto-title"><h1>🎱 내 당첨번호 확인 🎱</h1></section>
      
      <div>
        <form id="buy-lotto-form">
        <div id="buy-lotto-container">
          <label id="buy-lotto-input-label" for="buy-lotto-input">구입할 금액을 입력해주세요.</label>
          <input id="buy-lotto-input" placeholder="금액" type="text" />
        </div>
        
        <input id="buy-btn" type="submit" value="구입" />
        </form>
      </div>

      
      <div id="lotto-tickets-container">
        <span id="total-buy-text">총 7개를 구매하였습니다.</span>
        <ul>
          <li><span class="ticket-icon">🎟️</span> 12, 19, 22, 23, 28, 37</li>
          <li><span class="ticket-icon">🎟️</span> 12, 19, 22, 23, 28, 37</li>
          <li><span class="ticket-icon">🎟️</span> 12, 19, 22, 23, 28, 37</li>
          <li><span class="ticket-icon">🎟️</span> 12, 19, 22, 23, 28, 37</li>
          <li><span class="ticket-icon">🎟️</span> 12, 19, 22, 23, 28, 37</li>
          <li><span class="ticket-icon">🎟️</span> 12, 19, 22, 23, 28, 37</li>
          <li><span class="ticket-icon">🎟️</span> 12, 19, 22, 23, 28, 37</li>
        </ul>
      </div>

      <div id="result-container">
        <span id="winning-lotto-title">지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</span>
        <form>
          <div id="winning-lotto-input-container">
            <div class="number-input-container">
              <label>당첨 번호</label>
              <div id="winning-numbers-input">
                <input type="number" class="number-input" />
                <input type="number" class="number-input" />
                <input type="number" class="number-input" />
                <input type="number" class="number-input" />
                <input type="number" class="number-input" />
                <input type="number" class="number-input" />
              </div>
            </div>

            <div id="bonus-number-container" class="number-input-container">
              <label>보너스 번호</label>
              <input type="number" id="bonus-number" class="number-input" />
            </div>
          </div>

          <input type="submit" value="결과 확인하기" />
        </form>
      </div>
    `;
  };
  render(element);
}
