class CustomError extends Error {
  constructor(message) {
    super(message);

    if (this.constructor === CustomError) {
      throw new TypeError(
        "추상 클래스인 CustomError는 직접 인스턴스화 할 수 없습니다."
      );
    }
  }
}

class NotANumberError extends CustomError {
  constructor(text) {
    super();
    this.message = `'${text}'는 숫자가 아닙니다.`;
  }
}

class NotAnIntegerError extends CustomError {
  constructor(number) {
    super();
    this.message = `'${number}'는 정수가 아닙니다.`;
  }
}

class OutOfRangeError extends CustomError {
  constructor(number, { min, max }) {
    super();
    if (min == null && max == null) {
      throw new TypeError("min, max 중 하나의 값은 있어야 합니다.");
    }
    const minText = min == null ? "" : ` ${min}이상`;
    const maxText = max == null ? "" : ` ${max}이하`;
    this.message = `${number}가${minText}${maxText}의 숫자가 아닙니다.`;
  }
}

class DuplicatedNumbersError extends CustomError {
  constructor(numbers) {
    super();
    this.message = `'${numbers}'중에 중복된 숫자가 있습니다.`;
  }
}

export {
  CustomError,
  NotANumberError,
  NotAnIntegerError,
  OutOfRangeError,
  DuplicatedNumbersError,
};
