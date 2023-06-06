import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { deleteAdmin } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { DeleteConfirm } from './DeleteConfirm.js';

function AdminList({ user, setUsers }) {
  const navigate = useNavigate();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

  const handleDeleteUser = async (userId) => {
    try {
      await deleteAdmin(userId);
      setUsers((prevUsers) => prevUsers.filter((obj) => obj._id !== userId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditUser = (userId) => {
    navigate(`/editadmin/${userId}`);
  };

  return (
    <>
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.phoneNumber}</td>
        <td>{user.status}</td>
        <td>
          <FaEdit  style={{ cursor: 'pointer' }} onClick={() => handleEditUser(user._id)} />
          <FaTrash
            style={{ cursor: 'pointer' }}
            onClick={() => setIsDeleteModalOpen(true)}
          />
          <DeleteConfirm
            isOpen={isDeleteModalOpen}
            onRequestClose={() => setIsDeleteModalOpen(false)}
            onConfirm={() => {
              setIsDeleteModalOpen(false);
              handleDeleteUser(user._id);
            }}
          />
        </td>
      </tr>
    </>
  );
}

export default AdminList;
