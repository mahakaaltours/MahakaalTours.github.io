const fs = require('fs');
const path = require('path');

// 1. Path to your media folder
const mediaDir = path.join(__dirname, 'media');

// 2. Allowed image file extensions
const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

// 3. Load excluded images array (falls back to empty array if file missing)
let excludedImages = [];
const noDataPath = path.join(__dirname, 'gallery-no-data.js');

// Read directory and filter images
if (fs.existsSync(noDataPath)) {
    try {
        // Clear Node module cache so edits to gallery-no-data.js take effect immediately
        delete require.cache[require.resolve('./gallery-no-data.js')];

        const imported = require('./gallery-no-data.js');
        // Handle both default export and standard array export
        const list = imported.default || imported;
        if (Array.isArray(list)) {
            excludedImages = list;
            console.log(`Loaded ${excludedImages.length} images to exclude.`);
        } else {
            console.warn("gallery-no-data.js must export an array! Proceeding with 0 exclusions.");
        }
    } catch (err) {
        console.warn("Could not read gallery-no-data.js, proceeding without exclusions.");
    }
}

// Fisher-Yates Shuffle Algorithm for random ordering
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

try {
    // Read and filter images
    let files = fs.readdirSync(mediaDir).filter(file => {
        const ext = path.extname(file).toLowerCase();
        const isAllowedExt = allowedExtensions.includes(ext);
        const isNotExcluded = !excludedImages.includes(file);

        return isAllowedExt && isNotExcluded;
    });

    // Randomize image order
    files = shuffleArray(files);

    // Generate JavaScript content
    const content = `// Auto-generated & randomized gallery images array\nconst images = ${JSON.stringify(files, null, 2)};\n`;

    // Write to gallery-data.js
    fs.writeFileSync(path.join(__dirname, 'gallery-data.js'), content);

    console.log(`Success! Loaded and randomized ${files.length} images into gallery-data.js.`);
} catch (error) {
    console.error("Error reading media folder:", error.message);
}