const readlinePromises = require("node:readline/promises");
export const rl = readlinePromises.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const close = () => {
  rl.close();
};
