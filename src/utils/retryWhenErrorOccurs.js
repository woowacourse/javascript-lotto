const errorPrint = (error) => {
  if (typeof window === "undefined") {
    console.log(error.message);
  } else window.alert(error.message);
};

async function retryWhenErrorOccurs(callback, ...args) {
  try {
    return await callback(...args);
  } catch (error) {
    errorPrint(error);

    return retryWhenErrorOccurs(callback, ...args);
  }
}

export default retryWhenErrorOccurs;
