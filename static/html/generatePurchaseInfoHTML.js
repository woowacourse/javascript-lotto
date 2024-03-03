import LOTTO_RULE from '../../src/constants/rules/lottoRule';

export default function generatePurchaseInfoHTML(count, lottos) {
  return `
    <div class="lp-ticket-issuance">
      <span class="lp-ti-total-purchase-number">총 ${count}개를 구입하였습니다.</span>
      <div class="lp-ti-ticket-group">
      ${printLotto(lottos)}
      </div>
    </div>
    <div class="lp-number-input-group">
      <div class="lp-nig-text">지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</div>
      <div class="lp-nig-input-title">
        <span class="lp-nig-winning-number">당첨 번호</span>
        <span class="lp-nig-bonus-number">보너스 번호</span>
      </div>
      <div class="lp-nig-number-input-group" id="winning-bonus-number-input-group">
        <div class="lp-nig-winning-box">
          ${displayWinningNumberInput()}
        </div>
        <div class="lp-nig-bonus-box">
          <input class="lp-nig-input" type="number" id="bonusNumber" maxlength="2" min="1" max="45" required />
        </div>
      </div>
    </div>
    <button class="lp-winning-floating-btn default-button" id="display-result-btn">결과 확인하기</button>
  `;
}

function printLotto(lottos) {
  let lottoTicketsHTML = '';
  lottos.forEach((lotto) => {
    lottoTicketsHTML += `
          <div class="lp-ti-ticket">
              <div class="lp-ti-img">🎟️</div>
              <div class="lp-ti-lotto">${lotto.join(', ')}</div>
          </div>`;
  });
  return lottoTicketsHTML;
}

function displayWinningNumberInput() {
  let winningNumberInputs = '';
  for (let index = 0; index < LOTTO_RULE.LOTTO_COUNT; index += 1) {
    winningNumberInputs += `<input class="lp-nig-input" type="number" id="winningNumber${index + 1}" maxlength="2" min="1" max="45" required />`;
  }
  return winningNumberInputs;
}
