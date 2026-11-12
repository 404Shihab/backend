export const deleteUser = async(userId)=>{
    'use server';

    const res = await fetch(`http://localhost:8000/users/${userId}`,
        {
            method:'DELETE'
        });
    const data = await res.json();
    console.log('after delete', data);
    return data;
}