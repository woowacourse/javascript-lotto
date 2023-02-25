const inputAmount = document.querySelector("#inputAmount");
const inputAmountNext = document.querySelector("#inputAmountNext");
const randomLottoList = document.querySelector("#randomLottoList");
const inputAmountArea = document.querySelector(".inputAmountArea");

const mainPage = {
  addEvent(callback) {
    inputAmountArea.addEventListener("submit", (event) => {
      callback();
      event.preventDefault();
    });
  },

  getInputAmount() {
    return inputAmount.value;
  },

  clickInputAmount(randomLotteries) {
    inputAmount.value = "";

    if (!randomLotteries) return;

    this.showRandomLottoAmount(randomLotteries);
    this.showRandomLottoList(randomLotteries);
  },

  showRandomLottoAmount(randomLotteries) {
    document.querySelector(
      ".randomLottoAmount"
    ).textContent = `${randomLotteries.length}`;
  },

  showRandomLottoList(randomLotteries) {
    randomLottoList.innerHTML = "";

    this.makeRandomLottoList(randomLotteries);

    inputAmountNext.style.display = "block";
  },

  makeRandomLottoList(randomLotteries) {
    const nodeRandomLotto = randomLotteries.map((numbers) =>
      this.makeEachRandomLotto(numbers)
    );
    randomLottoList.append(...nodeRandomLotto);
  },

  makeEachRandomLotto(numbers) {
    const rowElem = document.createElement("div");
    rowElem.appendChild(this.makeSpanElement("lottoImg", "🎟"));
    rowElem.appendChild(this.makeSpanElement("randomLottoNumbers", numbers));
    return rowElem;
  },

  makeSpanElement(className, text) {
    const elem = document.createElement("span");
    elem.classList.add(className);
    elem.textContent = text;
    return elem;
  },
};

export default mainPage;
