// function w3_open() {
//   console.log("Function open called");
//   document.getElementById("leftPanel").style.display = "block";
// }

// function w3_close() {
//   console.log("Function close called");
//   document.getElementById("leftPanel").style.display = "none";
// }
// Define a flag variable to keep track of the panel state
let isPanelOpen = false;

function togglePanel() {
    console.log("Function called");
    var panel = document.getElementById("leftPanel");
    console.log(isPanelOpen);
    if (isPanelOpen) {
        // panel.classList.add("closed"); // Close the panel
        console.log("closed");
        document.getElementById("leftPanel").style.display = "none";
    } else {
        console.log("open");
        // panel.classList.remove("closed"); // Open the panel
        document.getElementById("leftPanel").style.display = "block";
    } 
    // Update the flag variable to reflect the new panel state
    isPanelOpen = !isPanelOpen;
}


// JavaScript code for form validation
document.addEventListener("DOMContentLoaded", function() {
  const galleryLink = document.querySelector('.sidebar a[href="#gallery"]');
  // const thumbnailsContainer = document.querySelector(".thumbnail");
  const thumbnailsContainer = document.getElementById("thumbnails");
  
  // JavaScript code to scroll to the top of the page on refresh (F5)
  window.addEventListener('beforeunload', function() {
    window.scrollTo(0, 0); // Scroll to the top of the page
  });

  // Function to generate thumbnail images
  function generateThumbnails() {
    thumbnailsContainer.innerHTML = ""; // Clear previous thumbnails

    const images = [
      '20230823_143831.jpg',
      '20231016_075917.jpg',
      '20231016_090933.jpg',
      '20230409_161010.jpg',
      '20230409_161129.jpg',
      '20230409_161206.jpg',
      '20230726_202728.jpg',
      '20230726_202850.jpg',
      '20230823_143720.jpg',
      '20230823_143842.jpg',
      '20230823_143843.jpg',
      '20230823_145116.jpg',
      '20230823_145118.jpg',
      '20231015_130324.jpg',
      '20231015_130329.jpg',
      '20231016_074846.jpg',
      '20231016_074849.jpg',
      '20231016_075920.jpg',
      '20231016_080106.jpg',
      '20231016_085620.jpg',
      '20231016_090937.jpg',
      '20231016_091133.jpg',
      '20231016_091143.jpg',
      '20231016_091241.jpg',
      '20231016_091316.jpg',
      '20231016_091327.jpg',
      '20231016_091410.jpg',
      'IMG-20221006-WA0004.jpg',
      'IMG-20221006-WA0006.jpg',
      'IMG-20221006-WA0008.jpg',
      'IMG-20221006-WA0009.jpg',
      'IMG-20221030-WA0000.jpg',
      'IMG-20230224-WA0025.jpg',
      'IMG-20230224-WA0030.jpg',
      'IMG_20231114_153059_572.jpg'
    ];
    
    const columnCount = 8; // Number of thumbnails per column
    const rowCount = Math.ceil(images.length / columnCount); // Calculate number of rows

    for (let i = 0; i < rowCount; i++) {
      const row = document.createElement("div");
      row.classList.add("thumbnail-row");
      
      for (let j = 0; j < columnCount; j++) {
        const index = i * columnCount + j;
        if (index >= images.length) break; // Exit loop if all images are added
        
        const thumbnail = document.createElement("img");
        thumbnail.src = "media/" + images[index];
        thumbnail.alt = images[index];
        thumbnail.classList.add("thumbnail");

        thumbnail.addEventListener("click", function() {
          openFullSize("media/" + images[index], "image");
        });

        row.appendChild(thumbnail);
      }
    thumbnailsContainer.appendChild(row);
  }
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
    const files = [
      '20230823_143831.jpg',
      '20231016_075917.jpg',
      '20231016_090933.jpg',
      '20230409_161010.jpg',
      '20230409_161129.jpg',
      '20230409_161206.jpg',
      '20230726_202728.jpg',
      '20230726_202850.jpg',
      '20230823_143720.jpg',
      '20230823_143842.jpg',
      '20230823_143843.jpg',
      '20230823_145116.jpg',
      '20230823_145118.jpg',
      '20231015_130324.jpg',
      '20231015_130329.jpg',
      '20231016_074846.jpg',
      '20231016_074849.jpg',
      '20231016_075920.jpg',
      '20231016_080106.jpg',
      '20231016_085620.jpg',
      '20231016_090937.jpg',
      '20231016_091133.jpg',
      '20231016_091143.jpg',
      '20231016_091241.jpg',
      '20231016_091316.jpg',
      '20231016_091327.jpg',
      '20231016_091410.jpg',
      'IMG-20221006-WA0004.jpg',
      'IMG-20221006-WA0006.jpg',
      'IMG-20221006-WA0008.jpg',
      'IMG-20221006-WA0009.jpg',
      'IMG-20221030-WA0000.jpg',
      'IMG-20230224-WA0025.jpg',
      'IMG-20230224-WA0030.jpg',
      'IMG_20231114_153059_572.jpg'
    ];
    
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

  let currentIndex = 0; // Keep track of the current image index
  
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
  
  function showNextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  const nextImage = images[currentIndex];
  openFullSize("media/" + nextImage, "image");
}

  function showPreviousImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  const previousImage = images[currentIndex];
  openFullSize("media/" + previousImage, "image");
}

// Initialize visitor count
let visitorCount = 0;

// Function to update and display visitor count
function updateVisitorCount() {
  // Increment visitor count
  visitorCount++;
  
  // Update count element
  const countElement = document.getElementById("count");
  countElement.textContent = visitorCount;
}

// Call the function to update the visitor count
updateVisitorCount();
  
});