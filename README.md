# 🌍 Wanderlust – Travel Accommodation Platform

A full-stack travel accommodation and destination platform that allows users to explore, filter, and manage listings of villas, hotels, cities, mountains, beaches, and more. Wanderlust delivers a seamless experience with category-based filtering, responsive UI, and map integration.

## 🌐 Demo

Check out the live demo: 👉(https://wanderlust-64j5.onrender.com)

---

## 🚀 Installation

### 1️⃣ Install dependencies
```bash
npm install
```

### 2️⃣ Configure environment variables
Create a `.env` file in the root:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
```

### 3️⃣ Run the app
```bash
node app.js
```

Then open 👉 `http://localhost:3000`

---

## 📂 Project Structure
```
wanderlust/
│── models/        # Database schemas (Mongoose)
│── routes/        # Express route handlers
│── views/         # EJS templates (frontend)
│── public/        # Static assets (CSS, JS, images)
│── app.js         # Entry point
│── .env.example   # Sample environment file
```

---

## 🔑 Core Features
- 🏝️ **Category Filtering** – Villas, Hotels, Cities, Beaches, Mountains, Camping.  
- 📸 **Dynamic Listings** – Real-time data from MongoDB.  
- 👤 **User Authentication** – Secure login & signup using Passport.js.  
- 🗺️ **Map Integration** – Leaflet.js + OpenStreetMap for location previews.  
- 📱 **Responsive UI** – Optimized for all devices.  

---

## 🧪 Example Workflows
- A traveler searches for **"beach"** → all beach stays appear with maps & prices.  
- A user clicks **"Trending"** → top popular destinations load dynamically.  
- On mobile → responsive cards ensure smooth browsing.  

---

## 🛠 Troubleshooting
- **MongoDB not connecting?** → Check `MONGO_URI` in `.env`.  
- **Session issues?** → Ensure `SESSION_SECRET` is set properly.  
- **Maps not loading?** → Verify Leaflet.js + tile server availability.  

---

## ⭐ Acknowledgements
- [Leaflet.js](https://leafletjs.com/) – Interactive maps  
- [Bootstrap](https://getbootstrap.com/) – Responsive UI  
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) – Database hosting  
- [Cloudinary](https://cloudinary.com/) – Image storage  
