class WinningInputView {
  #section;
  #handler;

  constructor(handleResultButton) {
    this.#handler = handleResultButton;
  }

  render() {
    this.#section = document.querySelector("#winning");

    this.#section.innerHTML = `<form class="winning__form">
            <p class="winning__title">지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</p>
            <div class="winning__input-group">
              <fieldset class="winning__lotto">
                <legend class="winning__input-title">당첨 번호</legend>
                <div class="winning__lotto-inputs">
                  <input class="winning__input" type="text" inputmode="numeric" maxlength="2" />
                  <input class="winning__input" type="text" inputmode="numeric" maxlength="2" />
                  <input class="winning__input" type="text" inputmode="numeric" maxlength="2" />
                  <input class="winning__input" type="text" inputmode="numeric" maxlength="2" />
                  <input class="winning__input" type="text" inputmode="numeric" maxlength="2" />
                  <input class="winning__input" type="text" inputmode="numeric" maxlength="2" />
                </div>
              </fieldset>
              <fieldset class="winning__bonus">
                <legend class="winning__input-title">보너스 번호</legend>
                <div class="winning__bonus-input">
                  <input class="winning__input" type="text" inputmode="numeric" maxlength="2" />
                </div>
              </fieldset>
            </div>
            <button type="submit" class="winning__button">결과 확인하기</button>
          </form>`;

    this.#addEventListener(this.#section);
  }

  #addEventListener(section) {
    const form = section.querySelector(".winning__form");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const winningLottoInput = section.querySelectorAll(".winning__lotto-inputs input");
      const bonusNumberInput = section.querySelector(".winning__bonus-input input");

      this.#handler(winningLottoInput, bonusNumberInput);
    });
  }

  show() {
    this.#section.style.display = "block";
  }

  hide() {
    this.#section.style.display = "none";
  }
}

export default WinningInputView;
