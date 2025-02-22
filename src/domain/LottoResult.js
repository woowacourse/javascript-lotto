import { RANKING } from "../constants/constants.js";

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
        if(ranking!==null) this.#result[ranking]++
    }

    findPrize(rank) {
        if (rank === null) {
            return 0;
        }
        const rankingKey = Object.keys(RANKING).find(key => RANKING[key].RANK === Number(rank));
        return RANKING[rankingKey].PRIZE
    }
    
    get result() {
        return Object.freeze({ ...this.#result });
    }

    get totalPrize() {
        return Object.entries(this.#result).reduce((total, [rank, count]) => {
            return total + this.findPrize(rank) * count;
        }, 0);
    }
}

export default LottoResult