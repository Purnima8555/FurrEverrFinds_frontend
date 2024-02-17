import { MdDelete, MdModeEdit } from 'react-icons/md';
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import React from "react";

interface Item {
    id: number;
    itemTitle: string;
    categoryType: string;
    itemPhoto: string;
}

const ItemList: React.FC = () => {
    const navigate = useNavigate();

    const { data, refetch } = useQuery({
        queryKey: ['LIST_ITEMS'],
        queryFn: () => {
            return axios.get('http://localhost:8080/content');
        },
    });

    const deleteRecipe = useMutation({
        mutationKey: ['DELETE_ITEMS'],
        mutationFn: (id: number) => {
            return axios.delete(`http://localhost:8080/content/${id}`);
        },
    });

    const handleEdit = (id: number) => {
        navigate(`/admin/contentedit/${id}`);
    };

    return (
        <>
            {/*<button onClick={() => navigate('/admin/contentCreate')}>Upload Recipe</button>*/}

            <div className="recipelist">
                {data?.data?.data?.map((items: Item) => (
                    <div key={items.id} className="recipelist-card flex">
                        <div className="recipelist-img">
                            <img src={items.itemPhoto} alt={items.itemTitle} />
                        </div>
                        <div className="recipelist-info flex">
                            <label className="tlabel">{items.itemTitle}</label>
                            <h2>Category: {items.categoryType}</h2>
                        </div>
                        <div className="edit-delete">
                            <button onClick={() => deleteRecipe.mutate(items.id,
                                {onSuccess: refetch})}>
                                <MdDelete size="2rem" />
                            </button>
                            <button onClick={() => handleEdit(items.id)}>
                                <MdModeEdit size="2rem" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ItemList;
