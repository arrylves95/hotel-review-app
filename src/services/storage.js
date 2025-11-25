// Minimal localStorage wrapper and helpers
export const storageKey = "hotel_review_app_v1";

export const storage = {
    getHotels() {
        try {
            const raw = localStorage.getItem(storageKey);
            const parsed = raw ? JSON.parse(raw) : null;
            if (!parsed || !Array.isArray(parsed)) {
                // seed with sample data
                const seed = [
                    {
                        id: "h_seed_1",
                        name: "Sea View Resort",
                        location: "Goa, India",
                        description: "A lovely seaside property with great views and friendly staff.",
                        reviews: [
                            { id: "r_seed_1", author: "Priya", rating: 5, text: "Amazing stay!", createdAt: new Date().toISOString() },
                            { id: "r_seed_2", author: "Ravi", rating: 4, text: "Very good service.", createdAt: new Date().toISOString() }
                        ]
                    },
                    {
                        id: "h_seed_2",
                        name: "Mountain Lodge",
                        location: "Manali, India",
                        description: "Cozy lodge in the mountains, excellent for hiking and warm evenings.",
                        reviews: []
                    }
                ];
                localStorage.setItem(storageKey, JSON.stringify(seed));
                return seed;
            }
            return parsed;
        } catch (err) {
            console.error("storage.getHotels error", err);
            return [];
        }
    },

    saveHotels(hotels) {
        try {
            localStorage.setItem(storageKey, JSON.stringify(hotels));
        } catch (err) {
            console.error("storage.saveHotels error", err);
        }
    }
};

export function calcAverageRating(hotel) {
    const r = hotel.reviews || [];
    if (r.length === 0) return null;
    const sum = r.reduce((s, x) => s + Number(x.rating || 0), 0);
    return Math.round((sum / r.length) * 10) / 10; // 1 decimal
}
