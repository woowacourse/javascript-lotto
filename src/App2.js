import Lotto from "./domain/Lotto";
import Lottos from "./domain/Lottos";
import Random from "./util/Random";
import LottoScore from "./domain/LottoScore";
import LOTTO_BOARD from "./constants/LottoBoard";

class App2 {
  #lottos;
  constructor() {}
  play() {
    const buyResultSection = document.querySelector(".lotto__buy-result");
    const buyMoneyInput = document.querySelector(".lotto__input-box");
      const buyButton = document.querySelector(".lotto__buy-button");
      const winningLottosInput = document.querySelectorAll(".lotto__winning-lotto-input");
      const resultButton = document.querySelector(".lotto__result-button")

    buyButton.addEventListener("click", () => {
      buyResultSection.classList.remove("hidden");
      this.createLotto(parseInt(buyMoneyInput.value / 1000));
      this.#lottos.lottos.forEach((lottoObj) => {
        this.showLottos(lottoObj);
      });
    });
      
      const winningLotto = [];
      let bonusNumber
      resultButton.addEventListener("click", () => {
        winningLottosInput.forEach(winningNumber => {
            winningLotto.push(Number(winningNumber.value))
          });
          console.log(winningLotto)

          bonusNumber = Number(document.querySelector(".lotto__bonus-lotto-input").value)
          console.log(bonusNumber)
          const lottoScore = new LottoScore(this.#lottos.lottos)
          
          this.compareLottos(winningLotto, bonusNumber, lottoScore)
          this.showResultTitle()
          for (const key in lottoScore.lottoRanking) {
             this.showResult(key, lottoScore)
          }
          this.showResultFooter()
      })





  }

  showLottos(lottoObj) {
    const lottoList = document.querySelector(".lotto__numbers-list");
    const templet = document.querySelector("#lotto-tem");
    const clone = document.importNode(templet.content, true);
    clone.querySelector(".lotto__lotto-icon").innerText = "🎟";
    clone.querySelector(".lotto__numbers").innerText = lottoObj.lottoNumbers;
    lottoList.appendChild(clone);
  }

  createLotto(lottoAmount) {
    const createdLotto = Array.from(
      { length: lottoAmount },
      () => new Lotto(Random.generateRandomNumbers())
    );
    this.#lottos = new Lottos(createdLotto);
  }
    
  compareLottos(winningLotto, bonusNumber,lottoScore) {
    this.#lottos.compareLottosWithWinningLotto(winningLotto, bonusNumber);
      lottoScore.compareLottosScore();
      console.log(lottoScore.lottoRanking)
  }
    
    showResult(key, lottoScore) {
        const templet = document.querySelector("#result");
        const clone = document.importNode(templet.content, true);
        
        clone.querySelector(".result__matching-count").innerText = key
        clone.querySelector(".result__price").innerText = LOTTO_BOARD.moneyBoard[key];
        clone.querySelector(".result__matching-lotto-count").innerText = lottoScore.lottoRanking[key];
        document.querySelector("#app").appendChild(clone)
    }
    
    showResultTitle() {
        const templet2 = document.querySelector("#result-title")
        const clone2 = document.importNode(templet2.content, true);
        document.querySelector("#app").appendChild(clone2)
        
    }
    
    showResultFooter() {
        const templet3 = document.querySelector("#result-footer")
        const clone3 = document.importNode(templet3.content, true);
        document.querySelector("#app").appendChild(clone3)
        
    }
}

export default App2;
