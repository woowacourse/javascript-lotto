const setPurchaseDetailVisibility = (state) => {
  const purchaseDetail = document.querySelector(".purchase-detail");
  purchaseDetail.style.display = state === "on" ? "flex" : "none";
};

export default setPurchaseDetailVisibility;
