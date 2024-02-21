class Validation {
  static isInteger(value) {
    return Number.isInteger(value);
  }

  static isAtLeast(value, threshold) {
    return value >= threshold;
  }
}

export default Validation;
