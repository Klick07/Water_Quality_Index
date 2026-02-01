import { useState, useEffect } from "react";
import "./App.css";
import WaterContainer from "./components/water.jsx";
import Navbar from "./components/navbar";
import Hero from "./components/hero.jsx";
import Login from "./components/login.jsx";
import HotspotMap from "./components/maps.jsx";
import GovDashboard from "./components/govdashboard.jsx";
import AuthContext from "./Context/AuthContext.js";
// import ModelViewer from "./components/3d.jsx";


import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const router = createBrowserRouter([
  {
    path: '/',
    element: <>  <Navbar/>  <Hero /> </>,
  },
  {
    path: '/login',
    element: <><Navbar color={true}/><Login  /></>,
  },
  {
    path: '/water',
    element: <><Navbar  /><WaterContainer /></>,
  },
  {
    path: '/map',
    element: <><Navbar /><HotspotMap /></>,
  },
  {
    path: '/govdashboard/:id',
    element: <><Navbar /><GovDashboard /></>,
  }
]);



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  




  // console.log(text);

  return (
    <>
    <AuthContext.Provider value={{ isAuthenticated, user, setIsAuthenticated, setUser }}>
      <RouterProvider router={router} />

    </AuthContext.Provider>
    </>
  );
}

export default App;
