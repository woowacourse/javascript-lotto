import LottoMoney from "../../domain/LottoMoney";
import lottoGenerator from "../../domain/lottoGenerator";
import RandomLottos from "./RandomLottos";

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
      LottoMoney.validate(parsedMoney);
      const lottoMoney = new LottoMoney(parsedMoney);
      RandomLottos.showRandomLottos('#game-generatedlotto-list', lottoGenerator.generateRandomLotto(lottoMoney.getLottoCount()));

    } catch (error) {
      alert(error);
    }
  }
}

export default GameMoneyInput;