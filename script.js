// JavaScript code for form validation and scrolling to the top
document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("contact-form");
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (subject.trim() === "") {
      alert("Please enter a subject.");
      return;
    }

    if (message.trim() === "") {
      alert("Please enter a message.");
      return;
    }

    // Form submission logic goes here
    // You can submit the form using AJAX or any other method
    // For simplicity, I'm just logging the form data to the console
    console.log("Email:", email);
    console.log("Subject:", subject);
    console.log("Message:", message);

    // Clear form fields after successful submission
    form.reset();
  });

  function isValidEmail(email) {
    // Very basic email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Scroll to the top of the page on reload
  window.scrollTo(0, 0);
});
