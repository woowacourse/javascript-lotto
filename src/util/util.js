export function throwError(errorResult) {
  if (Object.values(errorResult).some((value) => value)) {
    const errorMessage = `유효하지 않은 입력값입니다. 다시 입력해주세요.`;
    throw new Error(errorMessage);
  }
}

export function maxLengthCheck(object) {
  if (object.value.length > object.maxLength) {
    object.value = object.value.slice(0, object.maxLength);
  }
}
