const deepCopy = (inObject) => {
  let outObject;
  let value;
  let key;

  if (typeof inObject !== 'object' || inObject === null) {
    return inObject;
  }

  outObject = Array.isArray(inObject) ? [] : {};

  for (key in inObject) {
    value = inObject[key];

    outObject[key] = deepCopy(value);
  }

  return outObject;
};

export default deepCopy;
