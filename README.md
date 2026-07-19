# Mahakaal Tours & Bike Rental

Welcome to the official GitHub Pages site for **Mahakaal Tours & Bike Rental**. This website serves as a digital showcase for our travel and vehicle rental services, featuring a stunning gallery of our past journeys and the beautiful locations we serve.

## 🚀 Features

- **Dynamic Gallery**: A responsive grid of high-quality images from our tours.
- **Lightbox Viewer**: Click any image to view it in a full-screen, high-definition lightbox with smooth transitions.
- **Responsive Design**: Built with Tailwind CSS for a seamless experience across all devices.
- **Video Background**: An immersive background video that sets the mood for adventure.
- **Smooth Navigation**: Clean, modern navigation with scroll effects and transitions.

## 📂 Project Structure

- `index.html`: The main landing page and homepage.
- `gallery.html`: The dedicated gallery page featuring all tour photos.
- `styles.css`: Custom styles and animations.
- `media/`: Contains all video and image assets.

## 🛠️ Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge).
- [Node.js](https://nodejs.org/) (optional, for running a local server).

### Running Locally

1.  **Clone the repository** (or download the ZIP file).
2.  **Open `index.html`** in your web browser.

    *Alternatively, if you have Node.js installed, you can use `serve` to run the site locally:*
    ```bash
    npx serve .
    ```
    Then open the provided URL (usually `http://localhost:3000`) in your browser.

## 📸 Adding New Images

To add new images to the gallery:

1.  Place your image files in the `media/` directory.
2.  Edit `gallery.html` and add the new image filenames to the `imageFiles` array in the JavaScript section.

    ```javascript
    const imageFiles = [
        "new_image_1.jpg",
        "new_image_2.jpg",
        // ... existing images
    ];
    ```

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository, create a feature branch, and submit a pull request.
