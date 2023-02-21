export function showModal() {
  const $modal = document.querySelector('.modal');
  $modal.classList.add('is-active');
}

export function closeModal() {
  const $modal = document.querySelector('.modal');
  $modal.classList.remove('is-active');
}
