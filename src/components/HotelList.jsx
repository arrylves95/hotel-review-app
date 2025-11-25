import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { calcAverageRating } from "../services/storage";

export default function HotelList({ hotels }) {
    const [q, setQ] = useState("");
    const [sort, setSort] = useState("rating"); // rating, name

    const filtered = useMemo(() => {
        let list = hotels.filter(
            (h) =>
                h.name.toLowerCase().includes(q.toLowerCase()) ||
                (h.location || "").toLowerCase().includes(q.toLowerCase())
        );
        if (sort === "rating")
            list = list.slice().sort((a, b) => (calcAverageRating(b) - calcAverageRating(a)));
        if (sort === "name")
            list = list.slice().sort((a, b) => a.name.localeCompare(b.name));
        return list;
    }, [hotels, q, sort]);
    /* AHRA-16: Rendered hotel list with name, location, description */

    return (
        <div>
            <div className="toolbar">
                <input placeholder="Search by name or location" value={q} onChange={(e) => setQ(e.target.value)} />
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="rating">Top rated</option>
                    <option value="name">Name</option>

                </select>
            </div>

            <div className="grid">
                {filtered.length === 0 && <div className="card">No hotels found. Add one!</div>}
                {filtered.map((hotel) => (
                    <article key={hotel.id} className="hotel-card card">
                        <div className="hotel-card-body">
                            <h3><Link to={`/hotel/${hotel.id}`}>{hotel.name}</Link></h3>
                            <p className="muted">{hotel.location}</p>
                            <p>{hotel.description?.slice(0, 120)}</p>
                        </div>
                        {/* AHRA-17: Added search box + filtering by name and location */}
                        {/* AHRA-20: Saving new hotel data into localStorage*/}


                        <div className="hotel-card-meta">
                            <div className="rating">{calcAverageRating(hotel) || "—"} ★</div>
                            <div className="reviews-count">{(hotel.reviews || []).length} reviews</div>
                        </div>
                        {/* AHRA-18: Added sorting by rating and name */}
                    </article>
                ))}
            </div>
        </div>


    );
}
