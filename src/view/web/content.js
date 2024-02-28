export default function content(element) {
  const render = (element) => {
    element.innerHTML = `
      <section id="lotto-title"><h1>🎱 내 당첨번호 확인 🎱</h1></section>
      
      <div id="buy-lotto-container">
        <form id="buy-lotto-form">
          <div id="buy-lotto-container">
            <label id="buy-lotto-input-label" for="buy-lotto-input">구입할 금액을 입력해주세요.</label>
            <input id="buy-lotto-input" placeholder="금액" type="number" required step="1000" min="1000" />
          </div>
          <input id="buy-btn" type="submit" value="구입" />
        </form>
        <span class="input-error"></span>
      </div>

      <div id="step2">
        <span id="total-buy-text"></span>
        <div id="lotto-tickets-container">
          <ul>
          </ul>
        </div>

        <div id="winning-lotto-container"></div>
      </div>
    `;
  };
  render(element);
}
