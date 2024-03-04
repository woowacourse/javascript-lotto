export const mainPage = {
  generateCountNotice: count => {
    const $lottoCountMessageContainer = document.getElementById('lotto-count-message-container');

    $lottoCountMessageContainer.insertAdjacentHTML(
      'afterbegin',
      `<div class="content-message body-text" disabled="true">
            총 ${count}개를 구매하였습니다.
          </div>`,
    );
  },

  generatePurchasedLottosNotice: lottos => {
    const $lottosContainer = document.getElementById('lottos-container');

    lottos.forEach(lotto => {
      $lottosContainer.insertAdjacentHTML(
        'afterbegin',
        `<div id="lotto-ticket">
              <div class="icon">🎟️</div>
              <div id="lotto-numbers" class="body-text">${lotto.lottoNumbers}</div>
            </div>`,
      );
    });
  },

  generateWinningNumbersInputs: () => {
    const $winningLottoContainer = document.getElementById('winning-lotto-container');

    $winningLottoContainer.insertAdjacentHTML(
      'afterbegin',
      `<div class="content-message body-text">지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</div>
            <div id="winning-lotto-message-container">
              <div class="content-message body-text">당첨 번호</div>
              <div class="content-message body-text">보너스 번호</div>
            </div>
            <form id="number-form">
              <div id="number-form-container">
                <div id="winning-lotto-inputs">
                  <input type="text" class="input-shape number-input" name="numberInput" maxlength="2" />
                  <input type="text" class="input-shape number-input" name="numberInput" maxlength="2" />
                  <input type="text" class="input-shape number-input" name="numberInput" maxlength="2" />
                  <input type="text" class="input-shape number-input" name="numberInput" maxlength="2" />
                  <input type="text" class="input-shape number-input" name="numberInput" maxlength="2" />
                  <input type="text" class="input-shape number-input" name="numberInput" maxlength="2" />
                </div>
                <div><input type="text" class="input-shape number-input bonusNumber-input" name="numberInput" maxlength="2" /></div>
              </div>
              <button type="submit" id="number-button" class="lotto-button caption-text">결과 확인하기</button>
            </form>`,
    );
  },
};
