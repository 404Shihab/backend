import { Suspense } from "react";

const UsersList = async () => {
    const res = await fetch("http://localhost:8000/users", { cache: "no-store" });
    const json = await res.json();
    const users = Array.isArray(json) ? json : json.data || [];

    return (
        <>
            <h2 className="text-2xl font-bold mb-6">Users: {users.length}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                    <div
                        key={user.id || user._id}
                        className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-5"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-semibold">
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
                                <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                        </div>
                        {user.phone && (
                            <p className="mt-4 text-sm text-gray-600">Phone: {user.phone}</p>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

const UserPage = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <Suspense fallback={<p className="text-gray-500">Loading users...</p>}>
                <UsersList />
            </Suspense>
        </div>
    );
};

export default UserPage;