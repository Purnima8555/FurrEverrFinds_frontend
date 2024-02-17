import { FC, useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import './css/Order.css';
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

interface Item {
    id: number;
    itemPhoto: string;
    itemTitle: string;
    itemPrice: string;
}

const Order: FC = () => {
    const [itemData, setItemData] = useState<Item | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [orderDateTime, setOrderDateTime] = useState<string>('');

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItemData = async () => {
            try {
                const response = await axios.get<Item>(`http://localhost:8080/content/${id}`);
                setItemData(response.data);
                // Calculate total price based on initial quantity
                setTotalPrice(Number(response.data.itemPrice) * quantity);
            } catch (error) {
                console.error('Error fetching item data:', error);
            }
        };

        if (id) {
            fetchItemData();
        }
    }, [id, quantity]);

    // Function to handle quantity change
    const handleQuantityChange = (value: number) => {
        const newQuantity = Math.max(1, quantity + value);
        setQuantity(newQuantity);
        setTotalPrice(Number(itemData?.itemPrice) * newQuantity);
    };

    useEffect(() => {
        // Set the current date and time
        const currentDate = new Date();
        const formattedDateTime = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
        setOrderDateTime(formattedDateTime);
    }, []);

    const {
        register,
        handleSubmit
    } = useForm();


    const onSubmit: SubmitHandler<any> = async (data) => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.error('User ID not found in local storage');
            return;
        }

        try {
            await axios.post('http://localhost:8080/order/save', {
                userId: userId,
                contentId: id,
                location: data.location,
                quantity: `${quantity}`,
                totalPrice: `Rs ${totalPrice}`,
                orderTime: `${orderDateTime}`,
                payment: data.payment
            });
            console.log('Order sent successfully!');
            navigate("/purchaseList");
        } catch (error) {
            console.error('Error sending rating:', error);
        }
    };

    return (
        <>
            <Header/>

            <div className="checkout-container">
                {/* Product Container */}
                <form className="checkout-container" onSubmit={handleSubmit(onSubmit)}>
                    <div className="product-container">
                        {itemData && (
                            <div className="order-img">
                                <img src={itemData.itemPhoto} alt={itemData.itemTitle} />
                            </div>
                        )}
                        <div className="order-info">
                            {itemData && (
                                <>
                                    <h3>{itemData.itemTitle}</h3>
                                    <p>Price: Rs {itemData.itemPrice}</p>
                                </>
                            )}
                            {/* Quantity Manager */}
                            <div className="quantity-manager">
                                <p>Quantity of the product: </p>
                                <button type="button" onClick={() => handleQuantityChange(-1)}>-</button>
                                <input type="text" value={quantity} {...register("quantity")}/>
                                <button type="button" onClick={() => handleQuantityChange(1)}>+</button>
                            </div>
                        </div>
                    </div>
                    {/* Order Container */}
                    <div className="order-container">
                        <h2>Order Summary</h2>
                        <div className="input-container">
                            <label htmlFor="location">Location:</label>
                            <input type="text" id="location" placeholder="City/Area/Address..." {...register("location")} />
                        </div>
                        <div className="input-container">
                            <label htmlFor="totalPrice">Total Price:</label>
                            <input type="text" id="totalPrice" value={`Rs ${totalPrice}`} {...register("totalPrice")} />
                        </div>
                        <div className="input-container">
                            <label htmlFor="orderDateTime">Order DateTime:</label>
                            <input type="text" id="orderDateTime" value={orderDateTime} {...register("orderTime")} />
                        </div>
                        <div className="input-container">
                            <select id="paymentMethod" {...register("payment")}>
                                <option value="">Payment Method</option>
                                <option value="Via Online">Via Online</option>
                                <option value="Cash On Delivery">Cash On Delivery</option>
                            </select>
                        </div>
                        <button type="submit">Place Order</button>
                    </div>
                </form>
            </div>

            <Footer/>
        </>
    );
};

export default Order;
