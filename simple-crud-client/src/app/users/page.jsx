import React from "react";
import { getUsers } from "../lib/data";
import UsersTable from "../components/UsersTable";
import AddUserModal from "../components/AddUserModal";
import { createUser, deleteUser } from "../lib/actions";

const UsersPage = async () => {
    const users = await getUsers();

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-semibold">User Management</h2>
                <AddUserModal createUserAction={createUser}></AddUserModal>
            </div>

            <UsersTable users={users} deleteUserAction={deleteUser} />
        </div>
    );
};

export default UsersPage;