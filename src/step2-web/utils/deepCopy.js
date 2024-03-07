export const deepCopy = (target) => {
  // JSON이 지원하지 않는 타입(Function, undefined)은 복사하지 않는다.
  if (typeof target !== "object" || target === undefined || target === null) {
    return target;
  }

  return JSON.parse(JSON.stringify(target));
};
