import React from "react";
import { useParams, Link } from "react-router-dom";
import ReviewForm from "./ReviewForm";
import { calcAverageRating } from "../services/storage";

export default function HotelDetail({ hotels = [], onUpdate, onDelete }) {
    const { id } = useParams();
    const hotel = hotels.find((h) => h.id === id);

    if (!hotel) return <div className="card"><h2>Hotel not found</h2></div>;

    const addReview = (review) => {
        const updated = { ...hotel, reviews: [...hotel.reviews, review] };
        onUpdate(updated);
    };

    const deleteReview = (rid) => {
        const updated = { ...hotel, reviews: hotel.reviews.filter(r => r.id !== rid) };
        onUpdate(updated);
    };

    return (
        <div className="card">
            <h2>{hotel.name}</h2>
            <p className="muted">{hotel.location}</p>
            <p>{hotel.description}</p>

            <h3>Reviews ({hotel.reviews.length})</h3>
            {hotel.reviews.map(r => (
                <div key={r.id} className="review">
                    <strong>{r.author}</strong> — {r.rating} ★
                    <p>{r.text}</p>
                    <button onClick={() => deleteReview(r.id)}>Delete</button>
                </div>
            ))}

            <ReviewForm onSubmit={addReview} />

            <button onClick={() => onDelete(hotel.id)} className="danger" style={{ marginTop: 20 }}>
                Delete Hotel
            </button>

            <div style={{ marginTop: 16 }}>
                <Link to="/">← Back</Link>
            </div>
        </div>
    );
}
