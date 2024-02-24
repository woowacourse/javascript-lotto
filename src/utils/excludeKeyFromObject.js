const excludeKeyFromObject = ({ object, removeKey }) => {
  const withoutKeyObject = Object.entries(object).reduce((acc, [key, value]) => {
    if (key !== removeKey) {
      acc[key] = value;
    }
    return acc;
  }, {});

  return withoutKeyObject;
};

export default excludeKeyFromObject;
