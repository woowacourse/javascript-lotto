class Validation {
  static isInteger(value) {
    return Number.isInteger(value);
  }

  static isAtLeast(value, threshold) {
    return value >= threshold;
  }

  static hasLength(array, length) {
    return array.length === length;
  }

  static isInRange(value, min, max) {
    return value >= min && value <= max;
  }

  static isUnique(array) {
    return array.length === new Set(array).size;
  }
}

export default Validation;
