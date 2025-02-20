function validationMoney(money) {
  if (money % 1000 !== 0) {
    throw new Error();
  }
}

export { validationMoney };
