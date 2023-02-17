import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const Console = readline.createInterface({ input, output });

export default Console;
