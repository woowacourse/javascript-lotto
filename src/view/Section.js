class Section {
  #lottoGame;
  #Modal;

  constructor(lottoGame, Modal) {
    this.#lottoGame = lottoGame;
    this.#Modal = Modal;
    this.purchaseLotto = this.purchaseLotto.bind(this);
    this.gameResult = this.gameResult.bind(this);
  }

  render(element) {
    const renderData = `
    <div class="section-split"></div>
    <div class="section-split-main">
      <h2>🎱 내 번호 당첨 확인 🎱</h2>
      <div class="texts">구입 할 금액을 입력해주세요.</div>
      <div class="divide-two-element">
        <input type="number" placeholder="  금액" class="input-money" />
        <button class="purchase-button">구입</button>
      </div>
      <p class="purchased-lotto-amount"></p>
      <ul class="buy-lotto-list"></ul>

      <div class="texts">지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</div>
      <div class="texts divide-two-element">
        <div>당첨 번호</div>

        <div>보너스 번호</div>
      </div>
      <form class="get-all-lotto-numbers">
        <div class="my-lotto-numbers">
          <input type="number" min="1" max="45" />
          <input type="number" min="1" max="45" />
          <input type="number" min="1" max="45" /> 
          <input type="number" min="1" max="45" />
          <input type="number" min="1" max="45" />
          <input type="number" min="1" max="45" />
        </div>
        <input type="number" min="1" max="45" class="my-bonus-number" />
      </form>
      <button type="submit" class="get-result">결과 확인하기</button>
      
    </div>

    <div class="section-split"></div>`;

    element.innerHTML = renderData;
    const purchaseButton = document.querySelector('.purchase-button');
    const getResultButton = document.querySelector('.get-result');

    purchaseButton.addEventListener('click', this.purchaseLotto);
    getResultButton.addEventListener('click', this.gameResult);
  }

  purchaseLotto(e) {
    try {
      e.preventDefault();
      const inputMoney = Number(document.querySelector('.input-money').value);
      this.#lottoGame.purchaseLottos(inputMoney);

      const resultList = this.#lottoGame.getLottos().map((lotto) => {
        return `<li>🎟️ ${lotto.getLottoNumber().join(', ')}</li>`;
      });

      const purchaseLottoAmount = document.querySelector('.purchased-lotto-amount');
      purchaseLottoAmount.innerText = `총 ${resultList.length}개를 구매했습니다.`;
      document.querySelector('.buy-lotto-list').innerHTML = resultList.join(' ');
    } catch (error) {
      alert(error.message);
    }
  }

  gameResult(e) {
    try {
      e.preventDefault();
      const winningLottoNumberElement = document.querySelector('.my-lotto-numbers').children;
      const winningLottoNumber = [...winningLottoNumberElement].map((v) => Number(v.value));
      const bonusNumbers = Number(document.querySelector('.my-bonus-number').value);
      this.#lottoGame.generateWinningLotto(winningLottoNumber, bonusNumbers);
      const modal = new this.#Modal(this.#lottoGame.getWinningRankResult(), this.#lottoGame.getProfitRateOfPrize());
      modal.render(app);
    } catch (error) {
      alert(error.message);
    }
  }
}

export default Section;
