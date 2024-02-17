import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import {FaCircleUser} from "react-icons/fa6";

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

const UserList: React.FC = () => {
    const [isFetching, setIsFetching] = useState(false);

    // Fetch users from the API
    const { data: users, refetch } = useQuery('GET_USERS', async () => {
        const response = await axios.get<User[]>('http://localhost:8080/users/getAll');
        return response.data;
    });

    // Mutation for deleting a user
    const deleteUser = useMutation(async (id: number) => {
        setIsFetching(true);
        await axios.delete(`http://localhost:8080/users/deleteById/${id}`);
    }, {
        onSuccess: () => {
            // Refetch the data after successful deletion
            refetch();
        },
        onSettled: () => {
            setIsFetching(false);
        },
    });

    return (
        <div className="userlist">
            <section className="userlist">
                {isFetching && <p>Loading...</p>}
                {!isFetching && users && users.length === 0 && <p>No users found.</p>}
                {users && users.length > 0 && users.map((user) => (
                    <div key={user.id} className="userlist-card flex">
                        <span><FaCircleUser /></span>
                        <div className="userlist-info flex">
                            <label className="user-name">{user.firstName} {user.lastName}</label>
                            <h2>{user.email}</h2>
                        </div>
                        <div className="edit-delete">
                            <button onClick={() => deleteUser.mutate(user.id)}>
                                <MdDelete size="2rem" />
                            </button>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default UserList;
