import './LottoResultTable.css';

const LOTTO_RESULT_TABLE = `
  <div class="divider"></div>
  <div class="table-col">
    <div class="count-row">
      <p class="table-title">일치 갯수</p>
    </div>
    <div class="prize-row">
      <p class="table-title">당첨금</p>
    </div>
    <div class="match-row">
      <p class="table-title">당첨 갯수</p>
    </div>
  </div>
  <div class="divider"></div>
  <div class="table-col">
    <div class="count-row">
      <p class="lotto-body">3개</p>
    </div>
    <div class="prize-row">
      <p class="lotto-body">5,000</p>
    </div>
    <div class="match-row">
      <p class="lotto-body">n개</p>
    </div>
  </div>
  <div class="divider"></div>
  <div class="table-col">
    <div class="count-row">
      <p class="lotto-body">4개</p>
    </div>
    <div class="prize-row">
      <p class="lotto-body">50,000</p>
    </div>
    <div class="match-row">
      <p class="lotto-body">n개</p>
    </div>
  </div>
  <div class="divider"></div>
  <div class="table-col">
    <div class="count-row">
      <p class="lotto-body">5개</p>
    </div>
    <div class="prize-row">
      <p class="lotto-body">1,500,000</p>
    </div>
    <div class="match-row">
      <p class="lotto-body">n개</p>
    </div>
  </div>
  <div class="divider"></div>
  <div class="table-col">
    <div class="count-row">
      <p class="lotto-body">5개+보너스볼</p>
    </div>
    <div class="prize-row">
      <p class="lotto-body">30,000,000</p>
    </div>
    <div class="match-row">
      <p class="lotto-body">n개</p>
    </div>
  </div>
  <div class="divider"></div>
  <div class="table-col">
    <div class="count-row">
      <p class="lotto-body">6개</p>
    </div>
    <div class="prize-row">
      <p class="lotto-body">2,000,000,000</p>
    </div>
    <div class="match-row">
      <p class="lotto-body">n개</p>
    </div>
  </div>
  <div class="divider"></div>
`;

class LottoResultTable extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = LOTTO_RESULT_TABLE;
  }
}

customElements.define('lotto-result-table', LottoResultTable);
