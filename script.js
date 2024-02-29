// JavaScript code for form validation
document.addEventListener("DOMContentLoaded", function() {
  const galleryLink = document.querySelector('.sidebar a[href="#gallery"]');
  const thumbnailsContainer = document.querySelector(".thumbnails");
  
  // Function to generate thumbnail images
  function generateThumbnails() {
    thumbnailsContainer.innerHTML = ""; // Clear previous thumbnails

    images.forEach(image => {
      const thumbnail = document.createElement("img");
      thumbnail.src = "media/" + image;
      thumbnail.alt = image;
      thumbnail.classList.add("thumbnail");

      thumbnail.addEventListener("click", function() {
        openFullSize("media/" + image, "image");
      });

      thumbnailsContainer.appendChild(thumbnail);
    });
  }

  // Event listener for clicking on the "Gallery" link
  galleryLink.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default anchor behavior

    // Scroll to the top of the page
    window.scrollTo(0, 0);

    // Show the gallery section
    document.getElementById("gallery").style.display = "block";

    // Generate thumbnails
    generateThumbnails();
    
    // Show thumbnails container
    thumbnailsContainer.style.display = "block";
  });
  
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
    
    function isValidEmail(email) {
    // Very basic email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  });

  // Scroll to the top of the page on reload
  scrollToTop();

  // Load thumbnails for images and videos
  loadThumbnails();
  
  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  function loadThumbnails() {
    const mediaFolder = "media/";
    const thumbnailsContainer = document.getElementById("thumbnails");

    // List of image and video files

    // Sort files by name (latest to oldest)
    files.sort().reverse();

    files.forEach(file => {
      const fileType = getFileType(file);
      const thumbnail = document.createElement("img");
      thumbnail.src = mediaFolder + file;
      thumbnail.alt = "Thumbnail";
      thumbnail.className = "thumbnail";
      thumbnail.addEventListener("click", function() {
        openFullSize(mediaFolder + file, fileType);
      });
      thumbnailsContainer.appendChild(thumbnail);
    });
  }

  function getFileType(file) {
    const extension = file.split(".").pop().toLowerCase();
    return extension === "mp4" ? "video" : "image";
  }

  function openFullSize(file, type) {
    if (type === "video") {
      // Create a Plyr video player
      const player = new Plyr('#player', {
        // Options here
      });

      // Change the source of the Plyr player to the video file
      player.source = {
        type: 'video',
        sources: [
          {
            src: file,
            type: 'video/mp4', // Modify the type according to your video format
          },
        ],
      };

      // Show the Plyr player in a modal or inline player
      // For example, to show it in a modal:
      const modal = document.getElementById('videoModal');
      modal.style.display = 'block';

      // Alternatively, you can show the player inline in a div
      // Just ensure the div has the id 'player'
    } else {
      // Open full-size image in a new tab
      window.open(file);
    }
  }
  
});