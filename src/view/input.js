import readline from "node:readline/promises";

const rl = readline.createInterface({
  input: process.stdin,
});

export const input = async (prompt) => {
  const read = await rl.question(prompt);
  return read.trim();
};

export const close = () => rl.close();
