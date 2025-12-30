import React from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

const dummyUsers: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Viewer' },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'Admin' },
];

interface UserListProps {
    onUserSelect: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ onUserSelect }) => {
  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">User List (Remote Component)</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-gray-700">ID</th>
              <th className="px-4 py-2 text-left text-gray-700">Name</th>
              <th className="px-4 py-2 text-left text-gray-700">Email</th>
              <th className="px-4 py-2 text-left text-gray-700">Role</th>
            </tr>
          </thead>
          <tbody>
            {dummyUsers.map((user) => (
              <tr 
                key={user.id} 
                onClick={() => onUserSelect && onUserSelect(user)}
                className="hover:bg-blue-100 cursor-pointer border-b"
              >
                <td className="px-4 py-2 text-gray-600">{user.id}</td>
                <td className="px-4 py-2 font-medium text-blue-600">{user.name}</td>
                <td className="px-4 py-2 text-gray-600">{user.email}</td>
                <td className="px-4 py-2 text-gray-600">
                    <span className={`px-2 py-1 rounded text-xs ${
                        user.role === 'Admin' ? 'bg-purple-200 text-purple-800' : 
                        user.role === 'Editor' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'
                    }`}>
                        {user.role}
                    </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-gray-500 italic">
        * Click a user row to view details in the Host application.
      </p>
    </div>
  );
};

export default UserList;
