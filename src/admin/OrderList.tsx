import React from 'react';
import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';
import {BsCartCheck} from "react-icons/bs";

interface Order {
    id: number;
    quantity: string;
    orderTime: string;
    location: string;
    totalPrice: string;
    payment: string;
    userId: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
    };
    content: {
        id: number;
        itemTitle: string;
    }
}

const OrderList: React.FC = () => {
    const { data: purchases, refetch } = useQuery<Order[]>(
        'ORDERS',
        async () => {
            const response = await axios.get('http://localhost:8080/order');
            return response.data;
        }
    );

    // Mutation for deleting a purchase
    const deletePurchase = useMutation(
        (id: number) => axios.delete(`http://localhost:8080/order/${id}`),
        {
            onSuccess: () => {
                // Refetch purchases after a successful deletion
                refetch();
            },
        }
    );

    return (
        <div className="orderlist">
            <section className="orderlist">
                {purchases?.map((order) => (
                    <div key={order.id} className="orderlist-card flex">
                        <span><BsCartCheck /></span>
                        <div className="orderlist-user-info">
                            <h4>User Info:</h4>
                            <p>Full Name: {order.userId.firstName} {order.userId.lastName}</p>
                            <p>Email: {order.userId.email} </p>
                            <p>Location: {order.location}</p>
                        </div>
                        <div className="orderlist-info">
                            <h4>Product Info:</h4>
                            <p>Product Name: {order.content.itemTitle}</p>
                            <p>Quantity: {order.quantity}</p>
                            <p>Total Price: {order.totalPrice}</p>
                            <p>Order DateTime: {order.orderTime}</p>
                            <p>Payment Method: {order.payment}</p>
                        </div>
                        <div className="edit-delete">
                            <button onClick={() => deletePurchase.mutate(order.id)}>
                                <MdDelete size="2rem" />
                            </button>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default OrderList;
