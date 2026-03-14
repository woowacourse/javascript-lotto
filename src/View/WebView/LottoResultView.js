class LottoResultView {
  render({ amount, lottoList }) {
    const lottoResultBox = document.querySelector("#lotto-result-box");
    const html = `
            <!-- 구매한 로또 -->
            <div class="ui-title shape-content">
              <h2 class="title" id="amount-text">총 ${amount}개를 구매하였습니다.</h2>
            </div>
            <ul class="ui-list" id="lotto-list">
            ${lottoList
              .getLottoList()
              .map((lotto) => {
                const lottoNumbers = lotto.getNumbers();
                return `<li>🎟️ ${lottoNumbers.join(", ")}</li>`;
              })
              .join("")}
            </ul>


            <!-- 당첨번호, 보너스 번호 입력 -->
            <div class="ui-title shape-content">
              <h2 class="title">
                지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.
              </h2>
            </div>

            <div class="ui-form-cluster">
              <!-- 당첨번호 -->
              <div class="ui-form-group">
                <div class="form-group-title">당첨 번호</div>
                <div class="form-group-content">
                  <div class="ui-pin-root" id="winning-lottos">
                    <div class="ui-pin">
                      <input placeholder="" />
                    </div>
                    <div class="ui-pin">
                      <input placeholder="" />
                    </div>
                    <div class="ui-pin">
                      <input placeholder="" />
                    </div>
                    <div class="ui-pin">
                      <input placeholder="" />
                    </div>
                    <div class="ui-pin">
                      <input placeholder="" />
                    </div>
                    <div class="ui-pin">
                      <input placeholder="" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- 보너스 번호 -->
              <div class="ui-form-group align-right">
                <div class="form-group-title">보너스 번호</div>
                <div class="form-group-content">
                  <div class="ui-pin-root">
                    <div class="ui-pin" id="bonus-lotto">
                      <input placeholder="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 확인하기 버튼 -->
            <div class="ui-button-box">
              <button
                class="ui-button variant-primary is-block"
                id="result-button"
              >
                결과 확인하기
              </button>
            </div>
    `;
    lottoResultBox.innerHTML = html;
  }
  readLottoNumber(handler) {
    const resultButton = document.querySelector("#result-button");
    resultButton.addEventListener("click", () => {
      const winningNumbers = [
        ...document.querySelectorAll("#winning-lottos .ui-pin"),
      ]
        .map((pinElement) => {
          return pinElement.querySelector("input").value;
        })
        .map(Number);

      const bonusNumber = document.querySelector("#bonus-lotto input").value;

      handler(winningNumbers, Number(bonusNumber));
    });
  }
}

export default LottoResultView;
