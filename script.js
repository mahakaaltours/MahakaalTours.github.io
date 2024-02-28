// JavaScript code for form validation
document.addEventListener("DOMContentLoaded", function() {
    
  const galleryLink = document.querySelector('.sidebar a[href="#gallery"]');
  const thumbnailsContainer = document.querySelector(".thumbnails");
  
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
  
  const image = [
    '20230409_141047.jpg'，
    '20230409_141049.jpg'，
    '20230409_141051.jpg'，
    '20230409_144038.jpg'，
    '20230409_154456.jpg'，
    '20230409_161010.jpg'，
    '20230409_161129.jpg'，
    '20230409_161206.jpg'，
    '20230726_202728.jpg'，
    '20230726_202850.jpg'，
    '20230823_143720.jpg'，
    '20230823_143831.jpg'，
    '20230823_143842.jpg'，
    '20230823_143843.jpg'，
    '20230823_145116.jpg'，
    '20230823_145118.jpg'，
    '20231015_130324.jpg'，
    '20231015_130329.jpg'，
    '20231016_074846.jpg'，
    '20231016_074849.jpg'，
    '20231016_075917.jpg'，
    '20231016_075920.jpg'，
    '20231016_080106.jpg'，
    '20231016_085620.jpg'，
    '20231016_090933.jpg'，
    '20231016_090937.jpg'，
    '20231016_091133.jpg'，
    '20231016_091143.jpg'，
    '20231016_091241.jpg'，
    '20231016_091316.jpg'，
    '20231016_091327.jpg'，
    '20231016_091410.jpg'，
    'IMG-20221006-WA0004.jpg'，
    'IMG-20221006-WA0006.jpg'，
    'IMG-20221006-WA0008.jpg'，
    'IMG-20221006-WA0009.jpg'，
    'IMG-20221030-WA0000.jpg'，
    'IMG-20230224-WA0025.jpg'，
    'IMG-20230224-WA0030.jpg'，
    'IMG_20231114_153059_572.jpg'
  ];
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
  });
    
    // Scroll to the top of the page on reload
  scrollToTop();

  // Load thumbnails for images and videos
  loadThumbnails();
});

function scrollToTop() {
  window.scrollTo(0, 0);
}

function loadThumbnails() {
  const mediaFolder = "media/";
  const thumbnailsContainer = document.getElementById("thumbnails");

  // List of image and video files
  const files = [
    '20230409_141047.jpg'，
    '20230409_141049.jpg'，
    '20230409_141051.jpg'，
    '20230409_144038.jpg'，
    '20230409_154456.jpg'，
    '20230409_161010.jpg'，
    '20230409_161129.jpg'，
    '20230409_161206.jpg'，
    '20230726_202728.jpg'，
    '20230726_202850.jpg'，
    '20230823_143720.jpg'，
    '20230823_143800.mp4'，
    '20230823_143831.jpg'，
    '20230823_143842.jpg'，
    '20230823_143843.jpg'，
    '20230823_144024.mp4'，
    '20230823_145116.jpg'，
    '20230823_145118.jpg'，
    '20231015_130324.jpg'，
    '20231015_130329.jpg'，
    '20231016_074846.jpg'，
    '20231016_074849.jpg'，
    '20231016_075917.jpg'，
    '20231016_075920.jpg'，
    '20231016_080106.jpg'，
    '20231016_085620.jpg'，
    '20231016_090933.jpg'，
    '20231016_090937.jpg'，
    '20231016_091133.jpg'，
    '20231016_091143.jpg'，
    '20231016_091241.jpg'，
    '20231016_091316.jpg'，
    '20231016_091327.jpg'，
    '20231016_091410.jpg'，
    '20231017_090229.mp4'，
    'IMG-20221006-WA0004.jpg'，
    'IMG-20221006-WA0006.jpg'，
    'IMG-20221006-WA0008.jpg'，
    'IMG-20221006-WA0009.jpg'，
    'IMG-20221030-WA0000.jpg'，
    'IMG-20230224-WA0025.jpg'，
    'IMG-20230224-WA0030.jpg'，
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