import React, { useState } from "react";
import { auth } from "../services/auth";

export default function ReviewForm({ onSubmit }) {
    const [author, setAuthor] = useState("");
    const [rating, setRating] = useState(5);
    const [text, setText] = useState("");

    const submit = (e) => {
        e.preventDefault();

        const user = auth.getCurrentUser();
        if (!user) {
            return alert("You must be logged in to post reviews.");
        }

        if (!text.trim()) {
            return alert("Review text cannot be empty.");
        }

        const review = {
            id: "r_" + Date.now(),
            author: author || user.username,
            rating: Number(rating),
            text: text.trim(),
            createdAt: new Date().toISOString()
        };

        // send review to parent component
        onSubmit(review);

        // clear fields
        setAuthor("");
        setRating(5);
        setText("");
    };

    return (
        <form className="form" onSubmit={submit}>
            <label>
                Your name (optional):
                <input
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Display name"
                />
            </label>

            <label>
                Rating
                <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                >
                    {[5, 4, 3, 2, 1].map((n) => (
                        <option key={n} value={n}>
                            {n} ★
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Review
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </label>

            <div className="actions">
                <button type="submit">Post Review</button>
            </div>
        </form>
    );
}
