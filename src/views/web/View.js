import "../../components/header/Header.js";
import "../../components/footer/Footer.js";
import "../../components/lotto-purchase/LottoPurchase.js";
import "../../components/issued-lotto/IssuedLotto.js";
import "../../components/winning-lotto/WinningLotto.js";
import "../../components/lotto-result/LottoResult.js";

class View {
  constructor() {
    this.app = document.querySelector("#app");
    this.render();
  }

  render() {
    this.app.innerHTML = `
    <lotto-header></lotto-header>
    <div class="container">
      <main>
        <lotto-purchase></lotto-purchase>
        <issued-lotto></issued-lotto>
        <winning-lotto></winning-lotto>
        
      </main>
    </div>
    <lotto-footer></lotto-footer>
    `;
  }
}

export default View;

// <lotto-result></lotto-result>
