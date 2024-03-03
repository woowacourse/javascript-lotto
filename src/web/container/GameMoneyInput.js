import LottoMoney from "../../domain/LottoMoney";
import lottoGenerator from "../../domain/lottoGenerator";
import RandomLottos from "./RandomLottos";
import WinningLotto from "./WinningLotto";

const GameMoneyInput = {
  initGameMoneyInput() {
    const gameMoneyInputContainer = document.querySelector('#game-money-input-container');
    gameMoneyInputContainer.querySelector('.purchase').addEventListener('click', this.purchaseSubmitEvent.bind(this));
  },

  purchaseSubmitEvent(event = {}) {
    event.preventDefault();
    const moneyInput = document.querySelector('#game-money-input-form').value;
    const parsedMoney = Number(moneyInput);
    try {
      const lottoMoney = new LottoMoney(parsedMoney);
      const randomlottos = RandomLottos.showRandomLottos('#game-generatedlotto-list', lottoGenerator.generateRandomLotto(lottoMoney.getLottoCount()));
      WinningLotto.showWinningLottoInputUI(randomlottos);
    } catch (error) {
      
      alert(error);
    }
  }
}

export default GameMoneyInput;