export function memoize(callback) {
  const cache = new Map();

  return function (arg) {
    if (!cache.get(arg)) {
      cache.set(arg, new callback(arg));
    }

    return cache.get(arg);
  };
}
