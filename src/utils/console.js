import readline from 'readline';
import { deepFreeze } from './object/object.js';

/**
 * @module Console
 * 애플리케이션의 입/출력을 담당하는 유틸리티 모듈
 */
const Console = deepFreeze({
  /**
   * @param {string} query - 문자열
   * @returns {Promise<string>} 유저가 입력한 값의 Promise
   */
  readLineAsync(query = '') {
    return new Promise((resolve, reject) => {
      if (arguments.length !== 1) {
        reject(new Error('arguments must be 1'));
      }

      if (typeof query !== 'string') {
        reject(new Error('query must be string'));
      }

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question(query, (input) => {
        rl.close();
        resolve(input);
      });
    });
  },

  /**
   * @param {string} message - 전달 받은 문자열
   * @returns {void}
   */
  print(message) {
    console.log(message);
  },
});

export default Console;
