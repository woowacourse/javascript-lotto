export default function retryHandler(event, resolve) {
  window.location.reload();
  resolve();
}
