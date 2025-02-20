export function throwError(errorResult) {
  if (Object.values(errorResult).some((value) => value)) throw new Error();
}
