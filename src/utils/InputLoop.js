const inputloop = async (action) => {
  try {
    return await action();
  } catch (error) {
    console.log(error.message + "\n");
    return await inputloop(action);
  }
};

export default inputloop;
