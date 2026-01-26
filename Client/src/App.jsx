import { useState, useEffect } from "react";
import "./App.css";
import WaterContainer from "./components/water.jsx";
import Navbar from "./components/navbar";
import Hero from "./components/hero.jsx";
import Login from "./components/login.jsx";
import HotspotMap from "./components/maps.jsx";
// import ModelViewer from "./components/3d.jsx";


import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Galaxy from "./components/animation.jsx";




function App() {
  const sentences = [
  "I love girls.",
  "I love women.",
  "I love you!"
];
const speed = 70;
const delay = 1500;
const [text, setText] = useState("");
const [isDeleting, setIsDeleting] = useState(false);
const [loopNum, setLoopNum] = useState(0);
const [typingSpeed, setTypingSpeed] = useState(speed);

useEffect(() => {
  // Current index of the sentences array
  const i = loopNum % sentences.length;
  const fullText = sentences[i];

  const handleTyping = () => {
    if (!isDeleting) {
      // Typing: Add one character
      setText(fullText.substring(0, text.length + 1));
      setTypingSpeed(speed);
    } else {
      // Deleting: Remove one character
      setText(fullText.substring(0, text.length - 1));
      setTypingSpeed(speed / 2); // Deleting is usually faster
    }

    // If word is complete, pause before deleting
    if (!isDeleting && text === fullText) {
      setTimeout(() => setIsDeleting(true), delay);
    } 
    // If word is deleted, move to the next sentence
    else if (isDeleting && text === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
    }
  };

  const timer = setTimeout(handleTyping, typingSpeed);
  return () => clearTimeout(timer);
}, [text, isDeleting, loopNum, sentences, speed, delay]);



const router = createBrowserRouter([
  {
    path: '/',
    element: <>  <Navbar/>  <Hero text={text} /> </>,
  },
  {
    path: '/login',
    element: <><Navbar color={true}/><Login  /></>,
  },
  {
    path: '/water',
    element: <><Navbar color={true} /><WaterContainer /></>,
  },
  {
    path: '/map',
    element: <><Navbar color={true}/><HotspotMap /></>,
  },
  {
    path: '/animation',
    element: <><Navbar color={true}/><Galaxy /></>,
  }
]);


  // console.log(text);

  return (
    <>
      <RouterProvider router={router} />

    </>
  );
}

export default App;
