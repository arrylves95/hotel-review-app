import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ReviewForm from "./ReviewForm";
import { calcAverageRating, storage } from "../services/storage";

export default function HotelDetail({ hotels, onUpdate, onDelete }) {
    const { id } = useParams();
    const hotel = hotels.find((h) => h.id === id);
    const navigate = useNavigate();

    if (!hotel) return <div className="card"><h2>Hotel not found</h2><Link to="/">Back</Link></div>;

    function addReview(review) {
        const updated = { ...hotel, reviews: [...(hotel.reviews || []), review] };
        onUpdate(updated);
    }

    function deleteReview(reviewId) {
        if (!confirm("Delete review?")) return;
        const updated = { ...hotel, reviews: hotel.reviews.filter((r) => r.id !== reviewId) };
        onUpdate(updated);
    }

    function removeHotel() {
        if (!confirm("Delete hotel and its reviews?")) return;
        onDelete(hotel.id);
    }

    function exportHotel() {
        const data = JSON.stringify(hotel, null, 2);
        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${hotel.name.replace(/\s+/g, "_")}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    return (
        <div className="card">
            <div className="detail-header">
                <div>
                    <h2>{hotel.name}</h2>
                    <p className="muted">{hotel.location}</p>
                </div>
                <div className="detail-actions">
                    <div className="big-rating">{calcAverageRating(hotel) || "—"} ★</div>
                    <button onClick={exportHotel}>Export JSON</button>
                    <button onClick={removeHotel} className="danger">Delete Hotel</button>
                </div>
            </div>

            <p>{hotel.description}</p>

            <section>
                <h3>Reviews ({(hotel.reviews || []).length})</h3>
                <div className="reviews">
                    {(hotel.reviews || []).slice().reverse().map((r) => (
                        <div key={r.id} className="review">
                            <div className="review-head">
                                <strong>{r.author || "Anonymous"}</strong>
                                <span className="muted"> — {r.rating} ★</span>
                                <small className="muted"> • {new Date(r.createdAt).toLocaleString()}</small>
                            </div>
                            <p>{r.text}</p>
                            <div className="review-actions">
                                <button onClick={() => {
                                    const updated = { ...hotel, reviews: hotel.reviews.map(x => x.id === r.id ? { ...x, text: prompt("Edit review text:", r.text) || r.text } : x) };
                                    onUpdate(updated);
                                }}>Edit</button>
                                <button onClick={() => deleteReview(r.id)} className="danger">Delete</button>
                            </div>
                        </div>
                    ))}
                    {(!hotel.reviews || hotel.reviews.length === 0) && <div className="muted">No reviews yet — be the first!</div>}
                </div>
            </section>

            <section>
                <h3>Add a review</h3>
                <ReviewForm onSubmit={(r) => addReview(r)} />
            </section>
            {/* AHRA-19: Created Add Hotel form UI */}

            <div style={{ marginTop: 16 }}>
                <Link to="/">← Back to list</Link>
            </div>
        </div>
    );
}
