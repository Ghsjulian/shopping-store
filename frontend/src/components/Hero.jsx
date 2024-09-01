import React, { useState, useEffect } from "react";

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
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
            image: "/images/shopping_8.jpg",
            title: "Maximize Your Online Visibility"
        },
        {
            image: "/images/shopping_9.jpg",
            title: "Maximize Your Online Visibility"
        },
        {
            image: "/images/shopping_10.jpg",
            title: "Maximize Your Online Visibility"
        }
    ]);

    const handlePrevClick = () => {
        setCurrentSlide(
            prevSlide => (prevSlide - 1 + slides.length) % slides.length
        );
    };

    const handleNextClick = () => {
        setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
    };
    useEffect(() => {
        setInterval(() => {
            handleNextClick();
        }, 5000);
    }, []);

    return (
        <section className="hero">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`slide ${
                        index === currentSlide ? "active" : ""
                    }`}
                    style={{
                        transform:
                            index === currentSlide
                                ? "translateX(0)"
                                : "translateX(100%)"
                    }}
                >
                    <img src={slide.image} alt="Hero Section image" />
                    <div className="slide-title">
                        <h3>{slide.title}</h3>
                        <p>
                            Continue Shopping With Us And Stay Connected. All
                            Your favorite is here , Let's Buy new Something
                        </p>
                        <a hred="#">
                            Continue Shopping
                            <i className="bx bx-right-arrow-alt"></i>
                        </a>
                    </div>
                </div>
            ))}
            <div className="carousel-nav">
                <button className="prev" onClick={handlePrevClick}>
                    ‹
                </button>
                <button className="next" onClick={handleNextClick}>
                    ›
                </button>
            </div>
        </section>
    );
};

export default Hero;
