const deleteProductToast = document.getElementById("deleteProductToast");
const canceldeleteProduct = document.getElementById("canceldeleteProduct");
const confirmDeleteProduct = document.getElementById("confirmDeleteProduct");
const productNameToDelete = document.getElementById("productNameToDelete");

document.addEventListener("click", function (e) {
  if (e.target.closest(".deleteProductBtn")) {
    const button = e.target.closest(".deleteProductBtn");
    const productId = button.getAttribute("data-product-id");
    const productName = button.getAttribute("data-product-name");

    productNameToDelete.textContent = productName;

    confirmDeleteProduct.href = `/products/delete/${productId}`;

    deleteProductToast.classList.remove("hidden");
    deleteProductToast.classList.add("flex");
  }
});

canceldeleteProduct.addEventListener("click", () => {
  deleteProductToast.classList.add("hidden");
  deleteProductToast.classList.remove("flex");
});

deleteProductToast.addEventListener("click", (e) => {
  if (e.target === deleteProductToast) {
    deleteProductToast.classList.remove("flex");
    deleteProductToast.classList.add("hidden");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !deleteProductToast.classList.contains("hidden")) {
    deleteProductToast.classList.add("hidden");
    deleteProductToast.classList.remove("flex");
  }
});
