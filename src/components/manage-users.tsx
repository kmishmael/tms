import React, { useEffect, useState } from 'react';
import axios from 'axios';

import CreateUser from "./create-user.component";

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
}

interface UserProps {
    user: User;
    deleteUser: (id: string) => void;
}

const UserRow: React.FC<UserProps> = ({ user, deleteUser }) => (
    <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td>
            <button
                onClick={() => {
                    if (window.confirm('Are you sure you want to delete this user?')) {
                        deleteUser(user._id);
                    }
                }}
                className="badge badge-danger"
            >
                Delete
            </button>
        </td>
    </tr>
);

const ManageUsers: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get<User[]>('http://localhost:5000/users/');
                setUsers(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUsers();
    }, []);

    const deleteUser = async (id: string) => {
        try {
            await axios.delete(`http://localhost:5000/users/${id}`);
            setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const renderUsers = () => {
        return users.map(currentUser => (
            <UserRow user={currentUser} deleteUser={deleteUser} key={currentUser._id} />
        ));
    };

    return (
        <div>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{renderUsers()}</tbody>
            </table>
            <br />
            <CreateUser />
        </div>
    );
};

export default ManageUsers;
