'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

const ProfileClient: React.FC = () => {
    const { user, error, isLoading } = useUser();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    return (
        isClient && user && (
        <div>
            <img src={user.picture || ''} alt={user.name || 'User'} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
        </div>
        )
    );
};

export default ProfileClient;