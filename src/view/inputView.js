import { rl } from "../util/console";

export const inputView = {
  readline(message) {
    return rl.question(message);
  },
};
