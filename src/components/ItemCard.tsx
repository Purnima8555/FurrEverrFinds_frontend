import { FC } from 'react';
import './css/ItemCard.css'
// import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface ItemCardProps {
    item: {
        id: number;
        itemPhoto: string;
        itemTitle: string;
        itemPrice: string;
        categoryType: string;
        subcategoryType: string;
    };
}

const ItemCard: FC<ItemCardProps> = ({ item }) => {

    const navigate = useNavigate();

    const handleNavigate = (id: number) => {
        navigate(`/item/${id}`);
    };

    return (

        <div className="tcard">
            <div className="tcardimg">
                <img src={item.itemPhoto} alt={item.itemTitle} />
            </div>
            <div className="tcardinfo flex">
                <label className="tlabel">{item.itemTitle}</label>
                <p>Rs {item.itemPrice}</p>
                {/*can keep recipetitle or id*/}
                <a className="tcardbtn" onClick={() => handleNavigate(item.id)}>
                    View Details
                </a>
            </div>
        </div>
    );
};

export default ItemCard;
