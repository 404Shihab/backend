import React from "react";
import { getUsers } from "../lib/data";
import UsersTable from "../components/UsersTable";


const UsersPage = async () => {
    const users = await getUsers();

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">
                User Management
            </h2>

            <UsersTable users={users}></UsersTable>
        </div>
    );
};

export default UsersPage;