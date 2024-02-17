import React, { useState, useEffect } from 'react';
import Header from "../components/Header.tsx";
import Profiler from "../components/Profiler.tsx";
import Footer from "../components/Footer.tsx";
import '../pages/css/userProfile.css'

const UserProfile: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [error] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    throw new Error('User not identified.');
                }

                setLoading(false);
            } catch (error: any)
            {
                console.error('Error fetching user:', error.message);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <>
            <Header />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {error ? (
                        <p>Error: {error}</p>
                    ) : (
                        <Profiler />
                    )}
                </>
            )}
            <Footer />
        </>
    );
};

export default UserProfile;
