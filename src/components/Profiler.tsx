import '../components/css/Profiler.css'
import React, { useEffect, useState } from 'react';

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
}

const Profiler: React.FC = () => {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // Add loading state

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    throw new Error('User ID not found in local storage');
                }

                const accessToken = localStorage.getItem('token');
                if (!accessToken) {
                    throw new Error('Access token not found in local storage');
                }

                const response = await fetch(`http://localhost:8080/users/getById/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const userData: UserData = await response.json();
                setUser(userData);
                setLoading(false);
            } catch (error: any)
            {
                console.error('Error fetching user:', error.message);
                setLoading(false);
            }
        };

        fetchUser();
    }, []);


    const getProfilePictureInitials = (firstName: string, lastName: string): string => {
        const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
        return initials.toUpperCase();
    };

    return (
        <div className="userProfileContainer">
            {loading ? (
                <p>Loading user data...</p>
            ) : (
                <div className="profile-part">
                    <div className="profile-picture">
                        {user && getProfilePictureInitials(user.firstName, user.lastName)}
                    </div>
                    <div className="profile-info">
                        {user && ( // Check if user is not null
                            <>
                                <div>
                                    <strong>Username:</strong> {user.username}
                                </div>
                                <div>
                                    <strong>Full Name:</strong> {user.firstName} {user.lastName}
                                </div>
                                <div>
                                    <strong>Email:</strong> {user.email}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profiler;
