export const getArrayOfStrings = (arrays) => {
<<<<<<< HEAD
  return arrays.map((arr) => `[${arr.join(', ')}]`);
=======
  return arrays.reduce((acc, cur) => {
    acc.push(`[${cur.join(', ')}]`);
    return acc;
  }, []);
>>>>>>> upstream/eunwoo-levi
};
