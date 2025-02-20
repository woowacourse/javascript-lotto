import { RANKING } from '../constants/constants.js';

export const calculateTotalPrize = (lottoList) => {
    const prize = lottoList.reduce((acc, lotto) => {
        const rankKey = Object.keys(RANKING).find(key => RANKING[key].RANK === lotto.ranking);
        if (rankKey) {
            return acc + RANKING[rankKey].PRIZE;
        }
        return acc;
    }, 0);
    return prize;
};

