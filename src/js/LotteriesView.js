class LotteriesView {
  constructor(lotteries) {
    this.numberOfLotto = document.querySelector(".number-of-lotto");
    this.lotteriesList = document.querySelector(".lotto-number-list");
    this.showNumberOfLotteries(lotteries);
  }

  showNumberOfLotteries(lotteries) {
    console.log(this.numberOfLotto);
    this.numberOfLotto.innerText = `${lotteries.length}개 구매하였습니다.`;
  }

  showLotteries(lotteries) {
    lotteries.forEach((lottery) => {
      const li = document.createElement("li");
      li.innerText = `🎟️ ${lottery}`;
      this.lotteriesList.append(li);
    });
  }
}

export default LotteriesView;
