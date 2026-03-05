import { pickNumberInRange } from './Utils.js';

export class LottoMachine {

    #amount;
    #lottos;

    constructor(amount) {
        this.#amount = amount;
        this.purchaseCount = amount / 1000;
        this.#lottos = [];
        for(let i = 0 ; i < this.purchaseCount; i ++){
            const lotto = this.createLotto().sort((a, b) => a - b);
            this.#lottos.push(lotto);
        }
        this.matchResult = new Map([
            [1, 0],
            [2, 0],
            [3, 0],
            [4, 0],
            [5, 0],
        ]);
    }

    getLotto() {
        return [...this.#lottos];
    }

    updateMatchResult(rank) {
        if (rank !== null) {
            const current = this.matchResult.get(rank);
            this.matchResult.set(rank, current + 1);
        }
    }

    getMatchRank(matchCount, isMatchBonus) {
        if (matchCount === 6) return 1;
        if (matchCount === 5 && isMatchBonus) return 2;
        if (matchCount === 5) return 3;
        if (matchCount === 4) return 4;
        if (matchCount === 3) return 5;
        return null;
    }

    calculateMatchResult(winningNumber, bonusNumber) {
        this.#lottos.forEach((lotto) => {
            const matchCount = new Set([...lotto]).intersection(new Set([...winningNumber].map((number) => Number(number)))).size;
            const isMatchBonus = lotto.includes(Number(bonusNumber));
            const rank = this.getMatchRank(matchCount, isMatchBonus);
            this.updateMatchResult(rank);
        });
    }

    getTotalPrise(){
        let sum = 0;
        if(this.matchResult.get(1)) sum += 2000000000 * this.matchResult.get(1)
        if(this.matchResult.get(2)) sum += 30000000 * this.matchResult.get(2)
        if(this.matchResult.get(3)) sum += 1500000 * this.matchResult.get(3)
        if(this.matchResult.get(4)) sum += 50000 * this.matchResult.get(4)
        if(this.matchResult.get(5)) sum += 5000 * this.matchResult.get(5)

        return sum
    }

    getRateOfReturn(){
        
    }

    createLotto() {
        return pickNumberInRange(1, 45, 6);
    }
}
