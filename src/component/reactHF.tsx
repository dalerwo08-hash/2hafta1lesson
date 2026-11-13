
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

type User = {
    id: number;
    name: string;
    email: string;
    age: number;
};

const ReactHookForm = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState('');
    const [editId, setEditId] = useState<number | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<User>();

    // ADD & EDIT
    const onSubmit = (data: User) => {

        if (editId !== null) {

            setUsers(prev =>
                prev.map(user =>
                    user.id === editId
                        ? { ...data, id: editId }
                        : user
                )
            );

            setEditId(null);

        } else {

            const newUser = {
                ...data,
                id: Date.now(),
            };

            setUsers(prev => [...prev, newUser]);
        }

        reset();
    };

    // DELETE
    const deleteUser = (id: number) => {
        setUsers(prev => prev.filter(user => user.id !== id));
    };

    // EDIT
    const editUser = (user: User) => {
        setEditId(user.id);

        setValue('name', user.name);
        setValue('email', user.email);
        setValue('age', user.age);
    };

    // SEARCH
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    // CANCEL EDIT
    const cancelEdit = () => {
        setEditId(null);
        reset();
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-3xl mx-auto">

                <h1 className="text-3xl font-bold text-center mb-8">
                    User Management
                </h1>

                {/* FORM */}

                <div className="bg-white p-6 rounded-xl shadow mb-8">

                    <h2 className="text-xl font-bold mb-5">
                        {editId !== null ? 'Edit User' : 'Add User'}
                    </h2>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >

                        {/* NAME */}

                        <div>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="w-full border p-3 rounded-lg"
                                {...register('name', {
                                    required: 'Name is required'
                                })}
                            />

                            {errors.name && (
                                <p className="text-red-500 text-sm">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* EMAIL */}

                        <div>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full border p-3 rounded-lg"
                                {...register('email', {
                                    required: 'Email is required'
                                })}
                            />

                            {errors.email && (
                                <p className="text-red-500 text-sm">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* AGE */}

                        <div>
                            <input
                                type="number"
                                placeholder="Enter your age"
                                className="w-full border p-3 rounded-lg"
                                {...register('age', {
                                    required: 'Age is required',
                                    valueAsNumber: true,
                                    min: {
                                        value: 15,
                                        message: 'Minimum age is 15'
                                    }
                                })}
                            />

                            {errors.age && (
                                <p className="text-red-500 text-sm">
                                    {errors.age.message}
                                </p>
                            )}
                        </div>

                        {/* BUTTONS */}

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
                        >
                            {editId !== null ? 'Update User' : 'Add User'}
                        </button>

                        {editId !== null && (
                            <button
                                type="button"
                                onClick={cancelEdit}
                                className="w-full bg-gray-400 text-white p-3 rounded-lg"
                            >
                                Cancel
                            </button>
                        )}

                    </form>
                </div>

                {/* SEARCH */}

                <div className="bg-white p-5 rounded-xl shadow mb-6">

                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full border p-3 rounded-lg"
                    />

                </div>

                {/* USERS LIST */}

                <div className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-xl font-bold mb-5">
                        Users ({filteredUsers.length})
                    </h2>

                    {filteredUsers.length === 0 ? (

                        <p className="text-gray-500 text-center">
                            No users found
                        </p>

                    ) : (

                        <div className="space-y-4">

                            {filteredUsers.map(user => (

                                <div
                                    key={user.id}
                                    className="border p-4 rounded-lg flex flex-col sm:flex-row justify-between gap-4"
                                >

                                    <div>
                                        <h3 className="font-bold text-lg">
                                            {user.name}
                                        </h3>

                                        <p className="text-gray-500">
                                            {user.email}
                                        </p>

                                        <p className="text-gray-500">
                                            Age: {user.age}
                                        </p>
                                    </div>

                                    <div className="flex gap-2">

                                        <button
                                            onClick={() => editUser(user)}
                                            className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => deleteUser(user.id)}
                                            className="bg-red-600 text-white px-4 py-2 rounded-lg"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
};

export default ReactHookForm;
