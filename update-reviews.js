const fs = require('fs');
const path = require('path');
const SerpApi = require('google-search-results-nodejs');

require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const apiKey = process.env.SERPAPI_KEY;
if (!apiKey) {
    console.error("❌ Error: SERPAPI_KEY is not defined.");
    process.exit(1);
}

const search = new SerpApi.GoogleSearch(apiKey);

console.log("🔍 Step 1: Querying Google Maps for Mahakaal Tours...");

const lookupParams = {
    engine: "google_maps",
    q: "Mahakaal Tours & Bike Rentals Kathgodam",
    type: "search"
};

search.json(lookupParams, (localData) => {
    try {
        if (localData.error) {
            console.error("❌ Discovery Error:", localData.error);
            return;
        }

        // Handle both lists (local_results) and direct direct hit targets (place_results)
        let business = localData.local_results?.[0];
        let directPlace = localData.place_results;
        
        // Pull the dynamic data identifier regardless of which screen Google loaded
        let realDataId = business?.data_id || directPlace?.data_id;
        
        if (!realDataId) {
            console.error("❌ Could not extract a data_id from the map response.");
            console.log("Available keys:", Object.keys(localData));
            return;
        }

        const businessName = directPlace?.title || business?.title || "Mahakaal Tours & Bike Rentals";
        console.log(`🎯 Profile Bound! Found: "${businessName}"`);
        console.log(`🆔 Dynamic Data ID: ${realDataId}`);
        console.log("\n🔄 Step 2: Extracting real-time customer comments...");

        const reviewParams = {
            engine: "google_maps_reviews",
            data_id: realDataId,
            hl: "en",
            gl: "in"
        };

        search.json(reviewParams, (reviewData) => {
            if (reviewData.error) {
                console.error("❌ Review Fetch Error:", reviewData.error);
                return;
            }

            const totalReviews = reviewData.place_info?.reviews || directPlace?.reviews || business?.reviews || 0;
            const rating = reviewData.place_info?.rating || directPlace?.rating || business?.rating || 0;
            const rawReviews = reviewData.reviews || [];

            const formattedReviews = rawReviews.map(r => ({
                user: {
                    name: r.user?.name || r.name || "Verified Rider",
                    thumbnail: r.user?.thumbnail || r.avatar || null
                },
                rating: r.rating || 5,
                snippet: r.snippet || r.text || r.description || "",
                date: r.date || "Recently"
            })).filter(r => r.snippet.length > 5);

            const outputData = {
                total_reviews: totalReviews,
                rating: rating,
                updated_at: new Date().toISOString(),
                reviews: formattedReviews
            };

            const targetPath = path.join(__dirname, 'reviews.json');

            fs.writeFile(targetPath, JSON.stringify(outputData, null, 4), (err) => {
                if (err) {
                    console.error("❌ Failed to write file:", err);
                } else {
                    console.log(`\n✅ Success! New database written to: ${targetPath}`);
                    console.log(`📊 Statistics Saved -> Total Reviews: ${outputData.total_reviews} | Rating: ${outputData.rating}`);
                    
                    if (outputData.reviews.length > 0) {
                        console.log(`\nSample comment loaded:\n"${outputData.reviews[0].snippet.substring(0, 140)}..."\n— ${outputData.reviews[0].user.name}`);
                    }
                }
            });
        });

    } catch (err) {
        console.error("❌ Execution Exception:", err);
    }
});