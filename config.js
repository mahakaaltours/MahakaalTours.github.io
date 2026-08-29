const SITE_CONFIG = {
    WHATSAPP_NUMBER: "918859888845",
    BUSINESS_NAME: "Mahakaal Tours & Bike Rentals",

    // Package WhatsApp Catalog Product IDs
    PRODUCTS: {
        SCOOTY: "27661220653561943",
        BULLET: "27696108713411144",
        KUMAON: "23868442266073809",
        JAGESHWAR: "27385121431080341",
        CHARDHAM: "27084089307883956"
    },

    // Helper function matching your bot's logic
    getWaLink: function (productId) {
        return `https://wa.me/p/${productId}/${this.WHATSAPP_NUMBER}`;
    }
};