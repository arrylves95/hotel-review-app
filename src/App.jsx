import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import HotelList from "./components/HotelList";
import HotelDetail from "./components/HotelDetail";
import { storage } from "./services/storage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { auth } from "./services/auth";   // ✅ FIXED import

export default function App() {
  const [hotels, setHotels] = useState(storage.getHotels());
  const navigate = useNavigate();

  const currentUser = auth.getCurrentUser();  // ✅ FIXED placement

  useEffect(() => {
    storage.saveHotels(hotels);
  }, [hotels]);

  const addHotel = (hotel) => {
    setHotels((h) => [...h, hotel]);
    navigate("/");
  };

  const updateHotel = (updated) => {
    setHotels((h) => h.map((x) => (x.id === updated.id ? updated : x)));
  };

  const deleteHotel = (id) => {
    setHotels((h) => h.filter((x) => x.id !== id));
    navigate("/");
  };

  return (
    <div className="app">
      <header className="header">
        <Link to="/"><h1>Hotel Review</h1></Link>
        <nav>
          <Link to="/">Hotels</Link>
          <Link to="/add">Add Hotel</Link>

          {currentUser ? (
            <>
              <span style={{ marginLeft: 10 }}>Hello, {currentUser.username}</span>
              <button
                style={{ marginLeft: 10 }}
                onClick={() => { auth.logout(); window.location.reload(); }}
              >Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<HotelList hotels={hotels} onUpdate={updateHotel} />} />
          <Route path="/hotel/:id" element={<HotelDetail hotels={hotels} onUpdate={updateHotel} onDelete={deleteHotel} />} />
          <Route path="/add" element={<AddHotel onAdd={addHotel} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="footer">
        Built with localStorage • Honest development
      </footer>
    </div>
  );
}

function AddHotel({ onAdd }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Hotel name required");
    onAdd({
      id: "h_" + Date.now(),
      name,
      location,
      description,
      reviews: []
    });
  };

  return (
    <div className="card">
      <h2>Add Hotel</h2>
      <form onSubmit={submit} className="form">
        <label>
          Name <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Location <input value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>
        <label>
          Description <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <div className="actions">
          <button type="submit">Add Hotel</button>
        </div>
      </form>
    </div>
  );
}

function NotFound() {
  return <div className="card"><h2>Not Found</h2></div>;
}
