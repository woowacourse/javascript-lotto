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
    const nodeRandomLotto = randomLotteries.map((numbers) => {
      return this.makeEachRandomLotto(numbers);
    });
    randomLottoList.insertAdjacentHTML("beforeend", nodeRandomLotto.join(" "));
  },

  makeEachRandomLotto(numbers) {
    return `<div><span class="lottoImg">🎟</span><span class="randomLottoNumbers">${numbers}</span></div>`;
  },
};

export default mainPage;
