import ResultModal from './ResultModal';

const SECTION_PURCHASED_VIEW = `
<p class="purchased-lotto-amount"></p>
<ul class="buy-lotto-list"></ul>
<div class="texts">지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</div>
<div class="texts divide-two-element">
  <div>당첨 번호</div>
  <div>보너스 번호</div>
</div>
<form class="get-all-lotto-numbers">
<div class="lotto-number-box">
  <div class="my-lotto-numbers">${`<input type="number" min="1" max="45" name="lotto-number" />`.repeat(6)}</div>
  <input type="number" min="1" max="45" class="my-bonus-number" name="lotto-number" />
</div>
<button type="submit" name="lotto-number" class="get-result">결과 확인하기</button>
</form>    
</div>
`;

const INPUT_MONEY_VIEW = `
<div class="section-split-main">
<h2>🎱 내 번호 당첨 확인 🎱</h2>
<div class="texts">구입 할 금액을 입력해주세요.</div>
<form class="divide-two-element">
  <input type="number" placeholder="  금액" name="input-money" class="input-money" max="100000" min="1" />
  <button type="submit" name="input-money" class="purchase-button">구입</button>
</form>
</div>
`;

const LOTTO_RESULT_VIEW = (lotto) => `<li class="lotto-list">🎟️ ${lotto.getLottoNumber().join(', ')}</li>`;

class Section {
  #lottoGame;
  #Modal;

  constructor(lottoGame) {
    this.#lottoGame = lottoGame;
    this.#Modal = new ResultModal();
    this.purchaseLotto = this.purchaseLotto.bind(this);
    this.gameResult = this.gameResult.bind(this);
  }

  render(element) {
    this.element = element;

    element.innerHTML = INPUT_MONEY_VIEW;
    const purchaseForm = document.querySelector('.divide-two-element');
    purchaseForm.addEventListener('submit', this.purchaseLotto);
  }

  purchaseLotto(e) {
    try {
      e.preventDefault();
      // input value 가져오기
      const inputMoney = Number(e.target.children[0].value);
      const purchaseButton = document.querySelector('.purchase-button');

      // validation
      this.checkZeroInput(inputMoney);

      // model 업데이트
      this.#lottoGame.purchaseLottos(inputMoney);

      // view 업데이트
      purchaseButton.disabled = true;
      this.renderInputLottos();
      this.renderPurchasedLottos();
    } catch (error) {
      alert(error.message);
    }
  }

  getLottoResult() {
    return this.#lottoGame.getLottos().map((lotto) => LOTTO_RESULT_VIEW(lotto));
  }

  renderPurchasedLottos() {
    const resultList = this.getLottoResult();
    const purchaseLottoAmount = document.querySelector('.purchased-lotto-amount');
    purchaseLottoAmount.innerText = `총 ${resultList.length}개를 구매했습니다.`;
    document.querySelector('.buy-lotto-list').innerHTML = resultList.join(' ');
  }

  renderInputLottos() {
    const newResult = document.createElement('div');
    newResult.className = 'game-result';
    newResult.innerHTML = SECTION_PURCHASED_VIEW;
    if (!document.querySelector('.game-result')) {
      document.querySelector('.section-split-main').appendChild(newResult);
    } else {
      document.querySelector('.game-result').replaceWith(newResult);
    }

    const getResultForm = document.querySelector('.get-all-lotto-numbers');
    getResultForm.addEventListener('submit', this.gameResult);
  }

  gameResult(e) {
    try {
      e.preventDefault();
      const winningLottoNumberElement = document.querySelector('.my-lotto-numbers').children;
      const winningLottoNumber = [...winningLottoNumberElement].map((v) => Number(v.value));
      const bonusNumbers = Number(document.querySelector('.my-bonus-number').value);
      this.#lottoGame.generateWinningLotto(winningLottoNumber, bonusNumbers);

      this.#Modal.isRendered()
        ? (document.querySelector('.modal-none').className = 'modal-view')
        : (() => {
            this.#Modal.render(this.#lottoGame.getWinningRankResult(), this.#lottoGame.getProfitRateOfPrize());
          })();
      document.querySelector('.my-bonus-number').blur();
    } catch (error) {
      alert(error.message);
    }
  }

  checkZeroInput(data) {
    if (data === 0) throw new Error('입력값을 입력해주세요.');
  }
}

export default Section;
