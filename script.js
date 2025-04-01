document.addEventListener("DOMContentLoaded", () => {
  // --- Typewriter Effect ---
  const subtitle = document.querySelector(".subtitle");
  if (subtitle) {
    const originalText = subtitle.textContent.trim(); // Trim potential whitespace
    const cursorHTML = '<span class="cursor">_</span>'; // Store cursor html
    subtitle.innerHTML = ""; // Clear initial content

    let i = 0;
    const typeSpeed = 80; // Milliseconds per character

    const typeWriter = () => {
      if (i < originalText.length) {
        subtitle.innerHTML =
          originalText.substring(0, i + 1) + cursorHTML;
        i++;
        setTimeout(typeWriter, typeSpeed);
      } else {
        // Ensure cursor stays at the end after typing finishes
        subtitle.innerHTML = originalText + cursorHTML;
        // Optional: remove cursor blinking after a delay if desired
        // setTimeout(() => {
        //    subtitle.innerHTML = originalText;
        // }, 3000);
      }
    };

    // Add a small delay before starting to type
    setTimeout(typeWriter, 500);
  }

  // --- Copy to Clipboard Functionality ---
  const copyButtons = document.querySelectorAll(".copy-btn");
  const statusMessage = document.getElementById('status-message');

  copyButtons.forEach((button) => {
    const copyIcon = button.querySelector(".copy-icon");
    const checkIcon = button.querySelector(".check-icon");
    const buttonText = button.querySelector(".btn-text");
    const originalButtonText = buttonText.textContent;

    button.addEventListener("click", () => {
      const textToCopy = button.getAttribute("data-copy");

      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          // --- Visual Feedback ---
          // Hide copy icon, show check icon
          copyIcon.style.display = "none";
          checkIcon.style.display = "inline-block";

          // Change button text
          buttonText.textContent = "COPIED!";

          // Add success class
          button.classList.add("copied-success");

          // Display status message
          if (statusMessage) {
              const type = buttonText.textContent.includes("ADDR") ? "Address"
                         : buttonText.textContent.includes("USER") ? "Username"
                         : buttonText.textContent.includes("TAG") ? "Cashtag"
                         : buttonText.textContent.includes("EMAIL") ? "Email"
                         : "Data";
              statusMessage.textContent = `> ${type} copied to clipboard!`;
          }

          // Revert after a delay
          setTimeout(() => {
            copyIcon.style.display = "inline-block";
            checkIcon.style.display = "none";
            buttonText.textContent = originalButtonText;
            button.classList.remove("copied-success");
             if (statusMessage) {
                statusMessage.textContent = ""; // Clear status message
             }
          }, 2500); // Revert after 2.5 seconds
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
           if (statusMessage) {
               statusMessage.textContent = `> Error: Could not copy.`;
               setTimeout(() => { statusMessage.textContent = ""; }, 3000);
           }
        });
    });
  });

  // --- Subtle Body Flicker Effect --- (Optional - can be intense)
  //   setInterval(() => {
  //     document.body.style.opacity = Math.random() > 0.98 ? "0.9" : "1";
  //   }, 250);

  // --- Random Card Glitch Effect --- (Optional)
setInterval(() => {
  const cards = document.querySelectorAll(".card");
  if (cards.length > 0 && Math.random() > 0.96) {
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    const glitchX = (Math.random() * 6 - 3).toFixed(2); // smaller glitch
    const glitchY = (Math.random() * 4 - 2).toFixed(2);
    randomCard.style.transform = `translate(${glitchX}px, ${glitchY}px)`;
    setTimeout(() => {
       // Revert to hover state transform if applicable, else default
       if (!randomCard.matches(':hover')) {
          randomCard.style.transform = "translate(0, 0)";
       }
    }, 120); // Shorter glitch duration
  }
}, 1500);

}); // End DOMContentLoaded