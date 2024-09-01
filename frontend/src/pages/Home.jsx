import React, { useEffect } from "react";
import Hero from "../components/Hero";
import Latestproduct from "../components/Latestproduct"
import HeroCarousel from "../components/HeroCarousel"


const Home = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" }), [];
    });

    return (
        <>
            <HeroCarousel/>
            <Latestproduct/>
        </>
    );
};

export default Home;
