class Validator {
  isPriceValid(price) {
    if (this.isFloatPrice(price)) {
      return "금액은 소수가 될 수 없습니다.";
    }

    if (this.isNegativeNumber(price)) {
      return "금액은 자연수여야 합니다.";
    }

    if (this.isLessThanThousand(price)) {
      return "최소 입력금액은 1000원입니다.";
    }

    return null;
  }

  isFloatPrice(price) {
    return parseInt(price, 10) !== price;
  }

  isNegativeNumber(price) {
    return price < 0;
  }

  isLessThanThousand(price) {
    return 0 <= price && price < 1000;
  }
}

export default Validator;
