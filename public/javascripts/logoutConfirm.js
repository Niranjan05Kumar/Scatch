
document.addEventListener('DOMContentLoaded', function() {
  const logoutBtn = document.getElementById("logoutBtn");
  const logoutToast = document.getElementById("logoutToast");
  const cancelLogout = document.getElementById("cancelLogout");

  console.log('Logout confirm script loaded'); // Debug log

  if (logoutBtn && logoutToast && cancelLogout) {
    console.log('All logout elements found'); // Debug log
    
    logoutBtn.addEventListener("click", function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Logout button clicked'); // Debug log
      logoutToast.classList.remove("hidden");
      logoutToast.classList.add("flex");
    });

    cancelLogout.addEventListener("click", function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Cancel logout clicked'); // Debug log
      logoutToast.classList.add("hidden");
      logoutToast.classList.remove("flex");
    });

    logoutToast.addEventListener("click", function(e) {
      if (e.target === logoutToast) {
        console.log('Toast background clicked'); // Debug log
        logoutToast.classList.add("hidden");
        logoutToast.classList.remove("flex");
      }
    });

    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape" && !logoutToast.classList.contains("hidden")) {
        console.log('Escape key pressed'); // Debug log
        logoutToast.classList.add("hidden");
        logoutToast.classList.remove("flex");
      }
    });
  } else {
    console.error('Logout elements not found:', {
      logoutBtn: !!logoutBtn,
      logoutToast: !!logoutToast,
      cancelLogout: !!cancelLogout
    });
  }
});
