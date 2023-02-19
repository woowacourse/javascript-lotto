/**
 * @template T
 * @param {T[]} array
 * @returns {T[]}
 */
export function shuffle(array) {
  return array.sort(() => (Math.random() > 0.5 ? 1 : -1));
}
