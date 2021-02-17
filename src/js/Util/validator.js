export const isValidMoney = (money) => {
  if (isInValidNumber(money)) {
    alert("문자 및 공백은 입력 불가능합니다.");
    return false;
  }
  if (isInvalidRange(money)) {
    alert("1000원 이상, 5000원 이하만 입력 가능합니다.");
    return false;
  }
  if (isNotThousandMultiples(money)) {
    alert("1000원 단위로만 입력 가능합니다.");
    return false;
  }
  return true;
};

const isInvalidRange = (money) => {
  return money < 1000 || 5000 < money;
};

const isNotThousandMultiples = (money) => {
  return money % 1000 !== 0;
};

const isInValidNumber = (money) => {
  return !/^[0-9]+$/.test(money);
};
