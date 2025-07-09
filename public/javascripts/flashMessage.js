document.addEventListener("DOMContentLoaded", function () {
  const closeSuccessFlash = document.getElementById("closeSuccessFlash");
  const successFlash = document.getElementById("successFlash");
  if (closeSuccessFlash && successFlash) {
    closeSuccessFlash.addEventListener("click", function () {
      successFlash.style.display = "none";
    });
  }

  const closeErrorFlash = document.getElementById("closeErrorFlash");
  const errorFlash = document.getElementById("errorFlash");
  if (closeErrorFlash && errorFlash) {
    closeErrorFlash.addEventListener("click", function () {
      errorFlash.style.display = "none";
    });
  }

  const closeWarningFlash = document.getElementById("closeWarningFlash");
  const warningFlash = document.getElementById("warningFlash");
  if (closeWarningFlash && warningFlash) {
    closeWarningFlash.addEventListener("click", function () {
      warningFlash.style.display = "none";
    });
  }

  const closeInfoFlash = document.getElementById("closeInfoFlash");
  const infoFlash = document.getElementById("infoFlash");
  if (closeInfoFlash && infoFlash) {
    closeInfoFlash.addEventListener("click", function () {
      infoFlash.style.display = "none";
    });
  }

  const flashMessages = [successFlash, errorFlash, warningFlash, infoFlash];
  flashMessages.forEach((flash) => {
    if (flash) {
      setTimeout(function () {
        flash.style.display = "none";
      }, 3000);
    }
  });
});
