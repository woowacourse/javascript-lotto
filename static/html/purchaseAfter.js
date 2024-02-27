export default function () {
  return `
    <div class="lp-ticket-issuance">
      <span class="lp-ti-total-purchase-number">총 __개를 구입하였습니다.</span>
      <div class="lp-ti-ticket-group">
        <div class="lp-ti-ticket">
          <div class="lp-ti-img">🎟️</div>
          <div class="lp-ti-lotto">12, 23, 34, 45, 11, 24</div>
        </div>
        <div class="lp-ti-ticket">
          <div class="lp-ti-img">🎟️</div>
          <div class="lp-ti-lotto">12, 23, 34, 45, 11, 24</div>
        </div>
      </div>
    </div>
    <div class="lp-number-input-group">
      <div class="lp-nig-text">지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</div>
      <div class="lp-nig-input-title">
        <span class="lp-nig-winning-number">당첨 번호</span>
        <span class="lp-nig-bonus-number">보너스 번호</span>
      </div>
      <div class="lp-nig-number-input-group">
        <div class="lp-nig-winnig-box">
          <input class="lp-nig-input" type="text" id="winningNumber1" maxlength="2" required />
          <input class="lp-nig-input" type="text" id="winningNumber2" maxlength="2" required />
          <input class="lp-nig-input" type="text" id="winningNumber3" maxlength="2" required />
          <input class="lp-nig-input" type="text" id="winningNumber4" maxlength="2" required />
          <input class="lp-nig-input" type="text" id="winningNumber5" maxlength="2" required />
          <input class="lp-nig-input" type="text" id="winningNumber6" maxlength="2" required />
        </div>
        <div class="lp-nig-bonus-box">
          <input class="lp-nig-input" type="text" id="bonusNumber" maxlength="2" required />
        </div>
      </div>
    </div>
    <button class="lp-winning-floating-btn">결과 확인하기</button>
  `;
}
