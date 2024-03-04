import Lotto from "../../domain/Lotto";
import LottoNumber from "../../domain/LottoNumber";
import Result from "./Result";

const WinningLotto = {
  showWinningLottoInputUI(randomLottos, lottoMoney) {
    const winningLottoInformation = document.querySelector('#game-winninglotto-input-numbers-information');
    winningLottoInformation.innerHTML = '지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.';
    this.createWinningLottoInteraction();
    this.createBonusLottoInteraction();
    this.createResultButton(randomLottos, lottoMoney);
  },

  createWinningLottoInteraction() {
    const winningLottoInputInformation = document.querySelector('#game-winninglotto-input-numbers-information');
    winningLottoInputInformation.innerHTML = '당첨 번호';
    const winningLottoInteraction = document.querySelector('#game-winninglotto-input-numbers-interaction');
    winningLottoInteraction.innerHTML = `
    ${Array.from({length:Lotto.NUMBER_COUNT}, () => 
    `<input class='number-input-interaction' name='winning-number' type='number'/>`).join('  ')}`
  },

  createBonusLottoInteraction() {
    const bonusLottoInputInformation = document.querySelector('#game-winninglotto-input-bonus-information');
    bonusLottoInputInformation.innerHTML = '보너스 번호';
    const bonusLottoInputInteraction = document.querySelector('#game-winninglotto-input-bonus-interaction');
    bonusLottoInputInteraction.innerHTML =  `<input class='number-input-interaction' name='bonus-number' type='number'/>`;
  },
  
  createResultButton(randomLottos, lottoMoney) {
    const resultButton = document.querySelector('.result-button-container');
    resultButton.innerHTML = '<button class="result-button"> 결과 확인</button>';
    resultButton.addEventListener('click', () => {
      try {
        const winningNumbers = Array.from(document.querySelectorAll('[name="winning-number"]')).map(input => String(input.value));
        const winningLotto = new Lotto(winningNumbers.join());
        const bonusNumber = new LottoNumber(document.querySelector('[name="bonus-number"]').value);
        winningLotto.checkHaveBonus(bonusNumber.getLottoNumber());
        Result.showResult(winningLotto, bonusNumber, randomLottos, lottoMoney);
      }catch(error){
        alert(error)
      }}
    );
  }
}

export default WinningLotto;
