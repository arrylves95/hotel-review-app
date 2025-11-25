const HOTELS_KEY = "hotels_db";

export const storage = {
    getHotels() {
        return JSON.parse(localStorage.getItem(HOTELS_KEY) || "[]");
    },

    saveHotels(hotels) {
        localStorage.setItem(HOTELS_KEY, JSON.stringify(hotels));
    }
};

export function calcAverageRating(hotel) {
    if (!hotel.reviews || hotel.reviews.length === 0) return 0;
    const sum = hotel.reviews.reduce((a, r) => a + r.rating, 0);
    return (sum / hotel.reviews.length).toFixed(1);
}
