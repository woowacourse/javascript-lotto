import { RANKING } from '../constants/constants.js';

const add = (acc, lotto) => {
    const rankKey = Object.keys(RANKING).find(key => RANKING[key].RANK === lotto.ranking);
    if (rankKey) {
        return acc + RANKING[rankKey].PRIZE;
    }
    return acc;
};

export const calculateTotalPrize = (lottoList) => {
    const prize = lottoList.reduce((acc, lotto) => add(acc, lotto), 0);
    return prize;
};
