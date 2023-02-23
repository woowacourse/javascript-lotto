const LottoMachine = require('../domain/LottoMachine.js');

class ControllerLottoWeb {

    listLotto;
    money;
    constructor(){
        this.listLotto = []
        this.money = 0
        this.lottoMachine = new LottoMachine()
        this.setButtonClick();
    }

    setButtonClick(){
        document.getElementById("buy").addEventListener("click", this.playLotto)

        document.getElementById("result_button").addEventListener("click", this.playResult)

        document.querySelector(".close").addEventListener("click", this.close)

        document.querySelector(".restart").addEventListener("click", this.restart)
    }

    playLotto=()=>{
        this.money = document.getElementById("money").value;
        const lottoNumber = this.lottoMachine.countLotto(this.money)
        const buyText = document.getElementById("buyText")
        buyText.textContent = `총 ${lottoNumber}개를 구매했습니다.`
        buyText.style.visibility = "visible";
        this.lottoMachine.makeLotto(this.money);
        const lottoList = document.getElementById('lottoList')
        this.lottoMachine.lottoNumber.forEach((list, index)=>{
            const li = document.createElement('li')
            li.textContent = "🎟️"+list.toString()
            lottoList.append(li)
            this.listLotto[index] = list
        })
        const purchase = document.getElementById("purchase")
        purchase.style.visibility = "visible";

    }

    playResult=()=>{
        const winningNumber = []
        const winningNumbers = document.querySelectorAll('#winning');
        winningNumbers.forEach((number, index)=>{
            winningNumber[index] = number.value
        })
        const bonusNumber = document.getElementById("bonus").value
        const result = this.lottoMachine.getWinningStatus(winningNumber, bonusNumber);
        const result_lotto = document.querySelectorAll('#result');
        result_lotto.forEach((lotto, index)=>{
            lotto.textContent= `${result[4-index]}개`
        })
        const modal = document.querySelector(".modal");
        modal.style.visibility = "visible";
        const profit=document.querySelector('.result_profit');
        profit.textContent = `당신의 총 수익률은 ${this.lottoMachine.getProfitRate(this.money, result)}%입니다.`
    }

    restart=()=>{
        window.location.reload()
    }

    close=()=>{
        const modal = document.querySelector(".modal");
        modal.style.visibility = "hidden";
    }
}

module.exports = ControllerLottoWeb