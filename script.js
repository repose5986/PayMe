document.addEventListener("DOMContentLoaded", () => {
  // --- Set Current Year in Footer ---
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // --- Copy to Clipboard Functionality ---
  const copyButtons = document.querySelectorAll(".copy-btn");
  const statusMessage = document.getElementById('status-message');

  copyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const textToCopy = button.getAttribute("data-copy");

      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          // --- Visual Feedback ---
          button.classList.add("copied-success");

          // Display status message
          if (statusMessage) {
              const type = button.closest('.card').querySelector('.card-title').textContent || "Data";
              statusMessage.textContent = `Copied ${type} info! ✨`;
              statusMessage.classList.add('visible'); // Make it visible
          }

          // Revert after a delay
          setTimeout(() => {
            button.classList.remove("copied-success");
            if (statusMessage) {
               statusMessage.classList.remove('visible'); // Hide it again
               // Optional: Clear text after fade out if desired
               // setTimeout(() => { statusMessage.textContent = ""; }, 300);
            }
          }, 2500); // Revert after 2.5 seconds
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
          if (statusMessage) {
            statusMessage.textContent = `Error: Could not copy.`;
            statusMessage.classList.add('visible');
            setTimeout(() => { statusMessage.classList.remove('visible'); }, 3000);
          }
        });
    });
  });

 // --- Remove CRT/Terminal specific effects ---
 // No typewriter, no flicker, no glitch needed for this style.

}); // End DOMContentLoaded