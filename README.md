🌍 Wanderlust

A full-stack travel accommodation and destination platform that allows users to explore, filter, and manage listings of villas, hotels, cities, mountains, beaches, and more.
Wanderlust delivers a seamless experience with category-based filtering, responsive UI, and map integration.


📑 Table of Contents

Overview

Features

Tech Stack

Installation

Usage

Configuration

Examples

Troubleshooting



📝 Overview

Wanderlust is designed with a clean, responsive UI using Bootstrap and structured backend following MVC architecture. Users can browse listings, filter by categories, and view location maps integrated with Leaflet.js and OpenStreetMap.



✨ Features

🏡 Category-based Filtering – Explore stays by Villas, Hotels, Trending, Cities, Mountains, Beaches, Camping.

📸 Dynamic Listings – Each entry shows images, title, and price dynamically fetched from the database.

🔎 Search & Explore – Card-based responsive layout for browsing accommodations.

📱 Responsive Design – Optimized with Bootstrap for desktop, tablet, and mobile.

🗺️ Map Integration – Listing maps powered by Leaflet.js + OpenStreetMap.

⚙️ Backend – Node.js + Express with EJS templating for rendering.

🗄️ Database – MongoDB Atlas with Mongoose for data storage.

🔐 Authentication – Secure login & signup system for personalized features.



🛠️ Tech Stack

Frontend: HTML, CSS, Bootstrap, EJS
Backend: Node.js, Express.js
Database: MongoDB, Mongoose ORM
Other Tools: Git/GitHub, FontAwesome



🚀 Installation

Clone the repository:

git clone https://github.com/ombhalodiya45/wanderlust.git
cd wanderlust

"dependencies": {
    "axios": "^1.11.0",
    "cloudinary": "^2.7.0",
    "connect-flash": "^0.1.1",
    "cookie-parser": "^1.4.7",
    "dotenv": "^17.2.1",
    "ejs": "^3.1.10",
    "ejs-mate": "^4.0.0",
    "express": "^5.1.0",
    "express-session": "^1.18.2",
    "joi": "^17.13.3",
    "method-override": "^3.0.0",
    "mongodb": "^6.18.0",
    "mongoose": "^8.16.1",
    "multer": "^2.0.2",
    "multer-storage-cloudinary": "^4.0.0",
    "node-fetch": "^3.3.2",
    "passport": "^0.7.0",
    "passport-local": "^1.0.0",
    "passport-local-mongoose": "^8.0.0"
}



⚙️ Configuration

Create a .env file in the project root with the following variables:

PORT=3000
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key



📖 Usage

Browse listings via the homepage.

Filter accommodations by categories.

View details including images, price, and embedded map location.

Log in or sign up to personalize your experience.



🌟 Examples

A user searches for "beach" → displays all beach listings with photos, prices, and map.

A user selects "Trending" → shows top popular destinations dynamically from DB.

Responsive grid adapts across desktop, tablet, and mobile.



🛠️ Troubleshooting

Database not connecting? Check your MONGO_URI in .env.

Styles not loading? Ensure Bootstrap and FontAwesome are correctly linked.

Maps not displaying? Verify Leaflet.js and API/tile server configuration.
