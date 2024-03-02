import toast from "../../view/web/toast.js";

async function catchReturnInWeb(callback) {
  while (true) {
    try {
      return await callback();
    } catch (error) {
      toast(error.message);
    }
  }
}

export default catchReturnInWeb;
