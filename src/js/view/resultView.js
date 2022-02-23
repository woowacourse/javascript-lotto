export default class ResultView {
  constructor() {
    this.$result = document.querySelector('#result');
  }

  renderResult(count) {
    const template = this.makeResultTemplate(count);
    this.$result.replaceChildren();
    this.$result.insertAdjacentHTML('beforeend', template);
  }

  makeResultTemplate(count) {
    return `
      <div id="result-container">
        <div id="purchase-result">
          <div id="result-header">총 ${count}개를 구매하였습니다.</div>
          <div id="result-lotto">
            ${'<div class="lotto"><div class="lotto-icon">🎟️</div></div>'.repeat(count)}
          </div>
        </div>
        <div id="view-number">
            <div>번호 보기</div>
          <div class="toggle-switch">
            <input type="checkbox" id="view-checkbox" />
            <label for="view-checkbox">
              <span class="toggle-track"></span>
            </label>
          </div>
        </div>
      </div>
    `;
  }

  renderLottos(lottos) {
    const $lottos = document.querySelectorAll('.lotto');
    const $resultLottos = document.querySelector('#result-lotto');

    $lottos.forEach(($lotto, idx) => {
      $lotto.insertAdjacentHTML(
        'beforeend',
        `<div class="lotto-numbers">${lottos[idx].join(', ')}</div>`,
      );
    });

    $resultLottos.classList.toggle('checked');
  }

  initLottos() {
    const $lottosNumbers = document.querySelectorAll('.lotto-numbers');
    const $resultLottos = document.querySelector('#result-lotto');

    $lottosNumbers.forEach(($lottosNumber) => {
      $lottosNumber.remove();
    });

    $resultLottos.classList.toggle('checked');
  }

  initResult() {
    this.$result.replaceChildren();
  }
}
