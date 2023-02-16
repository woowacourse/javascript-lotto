import { ERROR} from '../utils/constant.js';

export const thousandValidate = money => {
    const isValidation = Number(money) % 1000 !== 0;
    if (!isValidation) console.log(ERROR.INPUT_MONEY_THOUSAND);
    return isValidation;
};

export const integerValidate = money => {
    const isValidation = !(isNaN(money) || money <= 0);
    if (!isValidation) console.log(ERROR.INPUT_MONEY_INTEGER);
    return isValidation;
};

export const maximumMoneyValidate = money => {
    const isValidation = money > 100000;
    if (!isValidation) console.log(ERROR.INPUT_MONEY_LIMIT);
    return isValidation;
};

export const winningIncludeBonusNumber = (numbers, bonus) => {
    const isValidation = numbers.includes(bonus);
    if (!isValidation) console.log(ERROR.BONUS_WINNING_NUMBER_DUPLICATION);
    return isValidation;
};

export const restartValidate = input => {
    const isValidation = input !== 'y' || input !== 'n';
    if (!isValidation) console.log(ERROR.RESTART_OR_FINISH);
    return isValidation;
};