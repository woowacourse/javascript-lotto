class Lotto {
    constructor(money){
        if(moeny%1000 !== 0) throw new Error("로또는 1000원 단위로 입력을 해주셔야 됩니다.")
        this.lottoMoney = money;
    }
}

export default Lotto