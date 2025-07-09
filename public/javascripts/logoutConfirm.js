
const logoutBtn = document.getElementById("logoutBtn");
const logoutToast = document.getElementById("logoutToast");
const cancelLogout = document.getElementById("cancelLogout");

logoutBtn.addEventListener("click", () => {
  logoutToast.classList.remove("hidden");
  logoutToast.classList.add("flex");
});

cancelLogout.addEventListener("click", () => {
  logoutToast.classList.add("hidden");
  logoutToast.classList.remove("flex");
});

logoutToast.addEventListener("click", (e) => {
  if (e.target === logoutToast) {
    logoutToast.classList.add("hidden");
    logoutToast.classList.remove("flex");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !logoutToast.classList.contains("hidden")) {
    logoutToast.classList.add("hidden");
    logoutToast.classList.remove("flex");
  }
});
