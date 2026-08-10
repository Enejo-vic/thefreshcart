import { useEffect, useState } from "react";

import Header from "./components/Header";
import IntroScreen from "./components/IntroScreen";
import Footer from "./components/footer";

import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Product";
import SignIn from "./pages/Signin";
import SignUp from "./pages/SignUp";
import AboutUs from "./pages/AboutUs";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Prevent scrolling while intro is showing
    document.body.style.overflow = "hidden";

    const introTimer = setTimeout(() => {
      setShowIntro(false);

      // Allow scrolling again
      document.body.style.overflow = "auto";
    }, 4200);

    return () => {
      clearTimeout(introTimer);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      {/* INTRO SCREEN */}
      {showIntro && <IntroScreen />}

      {/* FRESHCART WEBSITE */}
      <Header />



      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;