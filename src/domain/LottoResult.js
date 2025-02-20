class LottoResult {
    #result

    constructor(){
        this.#result={
            1:0,
            2:0,
            3:0,
            4:0,
            5:0
        }
    }

    addRankingCount(ranking){
        this.#result[ranking]++
    }

    get result(){
        return this.#result;
    }
}

export default LottoResult