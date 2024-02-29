const dialog = document.getElementById("result_dialog");

export default function retryHandler(event, resolve) {
  dialog.close();
  window.location.reload();
  resolve();
}
