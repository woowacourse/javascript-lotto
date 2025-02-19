export function printMessage(message) {
  console.log(message);
}

export function printError(errorMessage) {
  console.error(errorMessage);
}

export function printPurchasedAmount(amount) {
  console.log(`${amount}개를 구매했습니다.`);
}

export function printLotto(lotto) {
  console.log(`[${lotto.numbers.join(', ')}]`);
}
