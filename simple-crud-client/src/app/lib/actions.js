'use server';

import { revalidatePath } from "next/cache";

export const createUser = async (newUser) => {
    console.log('new user data', newUser);

    const res = await fetch('http://localhost:8000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    });

    if (!res.ok) {
        throw new Error(`Failed to create user: ${res.status}`);
    }

    const data = await res.json();
    console.log('data after post', data);

    revalidatePath('/users');

    return data;
};

export const deleteUser = async (userId) => {
    const res = await fetch(`http://localhost:8000/users/${userId}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        throw new Error(`Failed to delete user: ${res.status}`);
    }

    const data = await res.json();

    if (data.deletedCount > 0) {
        revalidatePath('/users');
    }

    return data;
};