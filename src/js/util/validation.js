const prefix = '[ERROR] ';

export const validations = {
  isInteger: {
    function: (value) => {
      return Number.isInteger(value);
    },
    error: (name) => `${prefix}${name}(은)는 정수 값이어야 합니다.`
  },

  isAtLeast: {
    function: (value, threshold) => {
      return value >= threshold;
    },
    error: (threshold, name) => `${prefix}${name}(은)는 ${threshold} 이상이어야 합니다.`
  },

  hasLength: {
    function: (array, length) => {
      return array.length === length;
    },
    error: (length, name) => `${prefix}${name}의 길이는 ${length}이어야 합니다.`
  },

  isInRange: {
    function: (value, min, max) => {
      return value >= min && value <= max;
    },
    error: (min, max, name) =>
      `${prefix}${name}(은)는 [${min} ~ ${max}] 범위 이내의 값이어야 합니다.`
  },

  isUnique: {
    function: (array) => {
      return array.length === new Set(array).size;
    },
    error: (name) => `${prefix}${name}(은)는 중복된 요소를 갖지 않아야 합니다.`
  }
};

export const validate = (validation, value, ...args) => {
  if (!validation.function(value, ...args)) {
    throw new Error(`${validation.error(...args)}`);
  }
};

export const validate2 = (validation, value, ...args) => {
  if (!validation.function(value, ...args)) {
    const errorMessage = `${validation.error(...args)}`;
    alert(errorMessage);
    throw new Error(errorMessage);
  }
};
