document.addEventListener("DOMContentLoaded", function () {
  console.log("Flash message script loaded"); // Debug log
  
  // Generic function to handle flash message closing
  function setupFlashMessage(flashId, closeButtonId) {
    const flashElement = document.getElementById(flashId);
    const closeButton = document.getElementById(closeButtonId);
    
    if (flashElement && closeButton) {
      console.log(`Setting up ${flashId}`); // Debug log
      
      // Close button click handler
      closeButton.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log(`Closing ${flashId}`); // Debug log
        flashElement.style.display = "none";
      });
      
      // Auto-hide after 5 seconds
      setTimeout(function () {
        if (flashElement.style.display !== "none") {
          flashElement.style.display = "none";
        }
      }, 5000);
    }
  }

  // Setup all flash message types
  setupFlashMessage("successFlash", "closeSuccessFlash");
  setupFlashMessage("errorFlash", "closeErrorFlash");
  setupFlashMessage("warningFlash", "closeWarningFlash");
  setupFlashMessage("infoFlash", "closeInfoFlash");
  
  // Alternative: Handle any close button with class-based approach
  document.addEventListener('click', function(e) {
    if (e.target.closest('.flash-close-btn')) {
      e.preventDefault();
      e.stopPropagation();
      const flashContainer = e.target.closest('[id$="Flash"]');
      if (flashContainer) {
        console.log('Closing flash via class selector'); // Debug log
        flashContainer.style.display = 'none';
      }
    }
  });
});
