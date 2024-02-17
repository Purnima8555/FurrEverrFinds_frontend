import './css/ItemView.css';
import Header from '../components/Header.tsx';
import { FC, useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import Footer from "../components/Footer.tsx";
import Rate from "../components/Rate.tsx";
import {FaRegStar} from "react-icons/fa6";
import {FaStarHalfAlt, FaStar} from "react-icons/fa";

interface Item {
    id: number;
    itemPhoto: string;
    itemTitle: string;
    itemPrice: string;
    itemDescription: string;
    description: string;
}

const ItemView: FC = () => {
    const [itemData, setItemData] = useState<Item | null>(null);
    const [rating, setRating] = useState<number | null>(null);

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch item data
                const recipeResponse = await axios.get<Item>(`http://localhost:8080/content/${id}`);
                setItemData(recipeResponse.data);

                // Fetch rating data
                const ratingResponse = await axios.get<number>(`http://localhost:8080/review/${id}`);
                setRating(ratingResponse.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);


    const handleRate = async (rating: number) => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.error('User ID not found in local storage');
            return;
        }

        try {
            await axios.post('http://localhost:8080/review', {
                userId: userId,
                contentId: id,
                rate: rating,
            });
            console.log('Rating sent successfully!');
        } catch (error) {
            console.error('Error sending rating:', error);
        }
    };


    const renderStars = () => {
        if (rating === null) {
            return <span>Rating not available</span>;
        }

        const fullStars = Math.floor(rating);
        const decimalPart = rating % 1;
        const hasHalfStar = decimalPart >= 0.5;

        const stars = [];
        for (let i = 0; i < fullStars; i++) {
            stars.push(<i key={i}><FaStar color="orange" size="1.6rem"/></i>);
        }

        if (hasHalfStar) {
            stars.push(<i key={fullStars}><FaStarHalfAlt color="orange" size="1.6rem"/></i>);
        }

        const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<i key={fullStars + i + (hasHalfStar ? 1 : 0)}><FaRegStar color="orange" size="1.6rem"/></i>);
        }

        return stars;
    };

    const navigate = useNavigate();

    const handleNavigate = (id: string | undefined) => {
        navigate(`/order/${id}`);
    };

    return (
        <>
            <Header />

            <main>

                <div className="item-container">
                    <div className="item-img-container">
                        <img src={itemData?.itemPhoto} alt={itemData?.itemTitle} />
                    </div>
                    <div className="description-container">
                        <h2>{itemData?.itemTitle}</h2>
                        <div className="rate">
                            {rating !== null ? (
                                renderStars()
                            ) : (
                                <span>Rating not available</span>
                            )}
                        </div>
                        <h4>Rs {itemData?.itemPrice}</h4>
                        <h5>Description</h5>
                        <p>{itemData?.itemDescription}</p>
                        <div className="item-btn">
                            <button onClick={() => handleNavigate(id)}>Buy Now</button>
                        </div>
                    </div>
                </div>
            </main>
            <section className="rate-recipe">
                {itemData && <Rate onRate={handleRate} />}
            </section>

            <Footer/>
        </>
    );
};

export default ItemView;
