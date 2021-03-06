import { NotANumberError } from "../errors/index.js";

const toNumber = (text) => {
  const number = Number(text);
  if (text === "" || Number.isNaN(text)) {
    throw new NotANumberError(text);
  }

  return number;
};

export { toNumber };
