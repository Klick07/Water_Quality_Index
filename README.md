<h1>Ganga Water Quality Index (WQI) Platform</h1>


A full-stack web application for monitoring, visualizing, and managing the Water Quality Index (WQI) of the Ganga river. The platform features a React + Vite frontend with 3D and animated visualizations, and a Node.js/Express backend with authentication and data APIs.

<h2>Features</h2>

<ul>
<li>
Modern React Frontend: Built with Vite, TailwindCSS, Framer Motion, and Three.js for smooth UI and 3D/animated backgrounds.
</li>
<li>
Interactive 3D Model: Scroll-driven 3D water model using react-three-fiber and drei.
</li>
<li>
Data Visualization: Dynamic WQI graphs and analytics using Recharts.  
</li>
<li>
Authentication: JWT-based login for government officials.
</li>
<li>
Role-based Dashboards: Separate dashboards for government and public users.
</li>
<li>
Map Integration: Water quality data visualized on interactive maps (Leaflet).
</li>
<li>
RESTful API: Secure endpoints for uploading and retrieving water quality data.
</li>
<li> 
Responsive Design: Mobile-friendly and accessible UI.
</li>
</ul>

<h2>Technologies Used</h2>
Frontend: React, Vite, TailwindCSS, Framer Motion, @react-three/fiber, drei, Recharts, Leaflet, React Router
Backend: Node.js, Express, PostgreSQL, JWT, bcrypt, dotenv, cors
Other: ESLint, Headless UI, Heroicons


<h2>Getting Started</h2>
<h3>Prerequisites</h3>
<ul>
<li>
Node.js (v18+ recommended)
</li>
<li>
npm
</li>
</ul>

Installation

Clone the repository:

Install dependencies for both client and server:

Configure environment variables:

Create a .env file in the server directory for DB connection, JWT secrets, etc.
Start the backend server:

Start the frontend (in a new terminal):

Access the app:

Frontend: http://localhost:5173
Backend API: http://localhost:3000
