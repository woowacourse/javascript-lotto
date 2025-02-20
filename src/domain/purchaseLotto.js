import { LOTTO_CONDITION } from "../constants/constants.js"
import { getRandomNumber } from "../utils/getRandomNumber.js";
import Lotto from "./Lotto.js";

export const purchaseLotto = (purchaseMoney) =>{
    const purchaeCount = purchaseMoney/LOTTO_CONDITION.PRICE;

    return Array.from({ length: purchaeCount }, () => createLotto(getRandomNumber(LOTTO_CONDITION.MIN_NUMBER,LOTTO_CONDITION.MAX_NUMBER)));
}

const createLotto = (ramdomNumber) =>{
    return new Lotto(ramdomNumber)
}