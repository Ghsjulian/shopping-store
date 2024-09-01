import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HeroCarousel = () => {
    const [slides, setSlides] = useState([
        {
            image: "/images/shopping_1.jpg",
            title: "Experience the Power of Digital Marketing"
        },
        {
            image: "/images/shopping_2.jpeg",
            title: "Get Ahead with PPC Advertising"
        },
        {
            image: "/images/shopping_3.jpg",
            title: "Maximize Your Online Visibility"
        },
        {
            image: "/images/shopping_4.jpg",
            title: "Maximize Your Online Visibility"
        },
        {
            image: "/images/shopping_6.jpg",
            title: "Maximize Your Online Visibility"
        },
        {
            image: "/images/shopping_7.jpg",
            title: "Maximize Your Online Visibility"
        },
        {
            image: "/images/shopping_10.jpg",
            title: "Maximize Your Online Visibility"
        }
    ]);

    return (
        <section className="hero">
            <Carousel
                showArrows={false}
                showThumbs={false}
                autoPlay={true}
                infiniteLoop={true}
                interval={3000}
            >
                {slides.map((slide, index) => (
                    <div key={index} className="slide">
                        <img src={slide.image} alt="Hero Section image" />
                        <div className="slide-title">
                            <h3>{slide.title}</h3>
                            <p>
                                Continue Shopping With Us And Stay Connected.
                                All Your favorite is here , Let's Buy new
                                Something
                            </p>
                            <a href="#products">
                                Continue Shopping
                                <i className="bx bx-right-arrow-alt"></i>
                            </a>
                        </div>
                    </div>
                ))}
            </Carousel>
        </section>
    );
};

export default HeroCarousel;
