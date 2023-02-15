import { rl } from "../util/console";

const inputView = {
  readline(message) {
    return rl.question(message);
  },
};
