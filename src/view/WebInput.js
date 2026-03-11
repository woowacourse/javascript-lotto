import Input from "./Input.js";

class WebInput extends Input {
  constructor() {
    super();
  }

  async readMoneyAsync() {
    const formEl = document.querySelector(".money__container");

    if (formEl) {
      formEl.innerHTML = `
        <label>구입금액을 입력해 주세요.</label>
        <div>
          <input type="number" id="money__input" name="money" min="1000" step="1000"/>
          <button id="money__submit">구입</button>
        </div>
      `;
    }

    return new Promise((resolve) => {
      if (formEl) {
        formEl.addEventListener("submit", (e) => {
          e.preventDefault();
          const formData = new FormData(formEl);
          const data = Object.fromEntries(formData.entries());
          resolve(data.money);
        });
      }
    });
  }

  async readWinningNumberAndBonusAsync() {
    const formEl = document.querySelector(
      ".winning-number-and-bonus__container",
    );

    if (formEl) {
      formEl.innerHTML = `
        <label for="#winning-number-and-bonus__input">구입금액을 입력해 주세요.</label>
        <div>
          <div>
            <label for="winning-number__first__input">당첨 번호</label>
            <div>
              <input type="number" id="winning-number__first__input" name="winning-number__first" min="1" max="45" step="1"/>
              <input type="number" id="winning-number__second__input" name="winning-number__second" min="1" max="45" step="1"/>
              <input type="number" id="winning-number__third__input" name="winning-number__third" min="1" max="45" step="1"/>
              <input type="number" id="winning-number__fourth__input" name="winning-number__fourth" min="1" max="45" step="1"/>
              <input type="number" id="winning-number__fifth__input" name="winning-number__fifth" min="1" max="45" step="1"/>
              <input type="number" id="winning-number__sixth__input" name="winning-number__sixth" min="1" max="45" step="1"/>
            </div>
          <div>
            <label for="bonus-number__input">보너스 번호</label>
            <div>
              <input type="number" id="bonus-number__input" name="bonus-number" min="1" max="45" step="1"/>
            </div>
          </div>
        </div>
        <button id="winning-number-and-bonus__submit">구입</button>
      `;
    }

    return new Promise((resolve) => {
      formEl.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        resolve({
          winningNumbersInput: [
            formData.get("winning-number__first"),
            formData.get("winning-number__second"),
            formData.get("winning-number__third"),
            formData.get("winning-number__fourth"),
            formData.get("winning-number__fifth"),
            formData.get("winning-number__sixth"),
          ].join(","),
          bonusNumberInput: formData.get("bonus-number"),
        });
      });
    });
  }

  async readRetryAsync() {
    const formEl = document.querySelector(".retry__container");

    if (formEl) {
      formEl.innerHTML = `
        <label>구입금액을 입력해 주세요.</label>
        <div>
          <input type="number" id="money__input" name="money" min="1000" step="1000"/>
          <button id="money__submit">구입</button>
        </div>
      `;
    }

    return new Promise((resolve) => {
      if (formEl) {
        formEl.addEventListener("submit", (e) => {
          e.preventDefault();
          const formData = new FormData(formEl);
          const data = Object.fromEntries(formData.entries());
          resolve(data.money);
        });
      }
    });
  }

  // async #waitingForUserInputAsync(message) {
  //   return new Promise((resolve) => {
  //     const rl = readline.createInterface({
  //       input: process.stdin,
  //       output: process.stdout,
  //     });

  //     rl.question(message ?? "", (line) => {
  //       rl.close();
  //       resolve(line);
  //     });
  //   });
  // }
}

export default WebInput;
