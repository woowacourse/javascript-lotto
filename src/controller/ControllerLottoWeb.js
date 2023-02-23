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
        document.getElementById("buy").addEventListener("click", this.purchaseButton)

        document.getElementById("result_button").addEventListener("click", this.lookResultButton)

        document.querySelector(".close").addEventListener("click", this.closeButton)

        document.querySelector(".restart").addEventListener("click", this.restartButton)
    }

    purchaseButton=()=>{
        this.money = this.readMoney();
        this.showPurchasedLottoNumber();
        this.lottoMachine.makeLotto(this.money);
        this.makeLottoList()
        this.showAllLotto();
    }

    readMoney=()=>{
        return document.getElementById("money").value;
    }

    showPurchasedLottoNumber=()=>{
        const lottoNumber = this.lottoMachine.countLotto(this.money)
        const buyText = document.getElementById("buyText")

        buyText.textContent = `총 ${lottoNumber}개를 구매했습니다.`
        buyText.style.visibility = "visible";
    }


    showAllLotto=()=>{
        const purchase = document.getElementById("purchase")
        purchase.style.visibility = "visible";
    }

    makeLottoList=()=>{
        const lottoList = document.getElementById('lottoList')
        this.lottoMachine.lottoNumber.forEach((list, index)=>{
            const li = document.createElement('li')
            li.textContent = "🎟️"+list.toString()
            lottoList.append(li)
            this.listLotto[index] = list
        })
    }

    lookResultButton=()=>{
        const winningNumber = this.getWinningNumber()
        const bonusNumber = this.readBonusNumber();

        const result = this.lottoMachine.getWinningStatus(winningNumber, bonusNumber);
        this.printResultLotto(result);
        this.printProfitResult(result);
        this.showModal()
    }

    getWinningNumber=()=>{
        const winningNumber = []
        const winningNumbersTag = this.readWinningNumbersTag();

        winningNumbersTag.forEach((number, index)=>{
            winningNumber[index] = number.value
        })

        return winningNumber
    }

    readWinningNumbersTag=()=>{
        return document.querySelectorAll('#winning');
    }

    readBonusNumber=()=>{
        return document.getElementById("bonus").value
    }

    printResultLotto=(result)=>{
        const result_lotto = document.querySelectorAll('#result');

        result_lotto.forEach((lotto, index)=>{
            lotto.textContent= `${result[4-index]}개`
        })
    }

    printProfitResult=(result)=>{
        const profit=document.querySelector('.result_profit');
        profit.textContent = `당신의 총 수익률은 ${this.lottoMachine.getProfitRate(this.money, result)}%입니다.`
    }

    showModal=()=>{
        const modal = document.querySelector(".modal");
        modal.style.visibility = "visible";
    }

    restartButton=()=>{
        window.location.reload()
    }

    closeButton=()=>{
        const modal = document.querySelector(".modal");
        modal.style.visibility = "hidden";
    }
}

module.exports = ControllerLottoWeb