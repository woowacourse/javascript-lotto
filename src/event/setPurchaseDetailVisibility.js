const setPurchaseDetailVisibility = (isVisible) => {
  const purchaseDetail = document.querySelector(".purchase-detail");
  purchaseDetail.style.display = isVisible ? "flex" : "none";
};

export default setPurchaseDetailVisibility;
