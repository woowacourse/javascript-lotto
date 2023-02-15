import Lotto from "./Lotto"

class RankedLotto {
    constructor(winningNumber, bonusNumber) {
        this.winningNumber = winningNumber;
        this.bonusNumber = bonusNumber;
        this.result = [0, 0, 0, 0, 0]
    }
    statisticalChart() {
        const lottoMoney = '1000';
        const lottoNumber = [[1,2,3,4,5,6], [1,2,3,4,5,7], [3,4,5,9,10, 11]]
        const lotto = new Lotto(lottoMoney, lottoNumber);

        const ranks = lotto.compareNumber(this.winningNumber, this.bonusNumber)
        ranks.sort((a,b)=>b-a).forEach((number)=>{
            switch(number){
                case 7 :
                    this.result[1]++;
                    break;
                case 6 :
                    this.result[0]++;
                    break; 
                case 5 :
                    this.result[2]++;
                    break;
                case 4 :
                    this.result[3]++;
                    break;
                case 3 :
                    this.result[4]++;
                    break;
            }
        })
    }


}

export default RankedLotto