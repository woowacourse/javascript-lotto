import AppError from "./Error.js";

export default async function executeOrRetryAsync({
  asyncFn,
  handleError,
  retryLimit = 3,
}) {
  let attempts = 0;
  while (attempts < retryLimit) {
    try {
      return await asyncFn();
    } catch (error) {
      handleError(error.message);
      attempts += 1;
    }
  }
  throw new AppError("재시도 횟수를 초과했습니다.");
}
