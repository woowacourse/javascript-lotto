import ERROR_MESSAGE from '../settings/ErrorMessage';

export default function checkLottoPurchase(input) {
  if (Number(input) < 1000) throw new Error(ERROR_MESSAGE.notEnoughMoney);
  if (Number(input) % 1000 !== 0) throw new Error(ERROR_MESSAGE.notANote);
}
