const LottoMachine = require('../domain/LottoMachine.js');

class ControllerLottoWeb {
    
    constructor(){
        const buyText = document.getElementById("buyText")
        buyText.style.visibility = "hidden";
        const purchase = document.getElementById("purchase")
        purchase.style.visibility = "hidden";
        const buy = document.getElementById("buy")
        buy.addEventListener("click", this.playLotto)
    }

    playLotto(){
        this.lottoMachine = new LottoMachine();
        const money = document.getElementById("money").value;
        const lottoNumber = this.lottoMachine.countLotto(money)
        const buyText = document.getElementById("buyText")
        buyText.textContent = `총 ${lottoNumber}개를 구매했습니다.`
        buyText.style.visibility = "visible";
        
    }

}

module.exports = ControllerLottoWeb