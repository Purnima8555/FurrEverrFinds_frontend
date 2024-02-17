import {useEffect, useState} from 'react';
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import './css/Slider.css';

const Slider = () => {

    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
        return () => clearInterval(slideInterval); // Clear interval on component unmount
        }, []);

    const sections = [
        {
            title: "With Love&Care",
            description: "\"Kickstart your day discovering for your furr babies\"",
            imgSrc: "header-img2.jpg",
        },

        {
            title: "Foods and Treats:",
            description: "\"Provide satisfying meals from our diverse treats collection\"",
            imgSrc: "pet-food.jpg",
        },

        {
            title: "Toys and Accessories:",
            description: "\"Explore various toys and accessories for your loved ones\"",
            imgSrc: "toys-accessories.jpg",
        },

        {
            title: "Clothing:",
            description: "\"Elevate your pet's looks with our diverse collection of styles\"",
            imgSrc: "pet-clothing.jpg",
        },

        {
            title: "Grooming and Hygiene:",
            description: "\"Pamper your furry friend with the finest in grooming and hygiene\"",
            imgSrc: "pet-hygiene.jpg",
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((current) => (current + 1) % sections.length);
    };

    const prevSlide = () => {
        setCurrentSlide((current) => (current - 1 + sections.length) % sections.length);
    };

    const { title, description, imgSrc} = sections[currentSlide];

    return (
        <div className={`container9 category-section-${currentSlide + 1}`}>
            <div className="content flex">
                <div className="category-image">
                    <img src={imgSrc} alt={title} width="100%"/>
                </div>
                <div className="category-details">
                    <h1>{title}</h1>
                    <p>{description}</p>
                </div>
                <div className="Slider-btn" style={{}}>
                    <button onClick={prevSlide}>< IoIosArrowBack /></button>
                    <button onClick={nextSlide}>< IoIosArrowForward /></button>
                </div>
            </div>
        </div>
    );
};

export default Slider;