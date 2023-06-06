import React, { useEffect, useState } from 'react';
import { getNotificationInfo, deleteNotification, updateNotification } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const AnnouncementList = () => {
  const [details, setDetails] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    status: '',
    date: '',
    image: null,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getNotificationInfo();
      const data = response.data;
      const sortedData = data.reverse();
      setDetails(sortedData);
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };

  const handleEdit = (id) => {
    setEditId(id);
    setEditMode(true);

    const notification = details.find((detail) => detail._id === id);
    if (notification) {
      setFormData({
        title: notification.title,
        content: notification.content,
        status: notification.status,
        date: notification.date,
        image: null, 
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNotification(id);
      fetchData();
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editMode) {
      const updatedNotification = {
        title: formData.title,
        content: formData.content,
        status: formData.status,
        date: formData.date,
        image: formData.image, // Include the updated image in the update request
      };

      updateNotification(editId, updatedNotification)
        .then((response) => {
          console.log('Notification updated successfully', response);
          setFormData({
            title: '',
            content: '',
            status: '',
            date: '',
            image: null,
          });
          setEditMode(false);
          fetchData();
        })
        .catch((error) => {
          console.error('Failed to update notification:', error);
        });
    }
  };

  return (
    <div className="details-page">
      <h1>Details</h1>
      <table className="banner-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Status</th>
            <th>Publish Date</th>
            <th>Media</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {details.map((detail) => (
            <tr key={detail._id}>
              {editMode && detail._id === editId ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(event) =>
                        setFormData({ ...formData, title: event.target.value })
                      }
                    />
                  </td>
                  <td>
                    <textarea
                      value={formData.content}
                      onChange={(event) =>
                        setFormData({ ...formData, content: event.target.value })
                      }
                    ></textarea>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={formData.status}
                      onChange={(event) =>
                        setFormData({ ...formData, status: event.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={formData.date}
                      onChange={(event) =>
                        setFormData({ ...formData, date: event.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="check-icon"
                      onClick={handleSubmit}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="cancel-icon"
                      onClick={() => setEditMode(false)}
                    />
                  </td>
                </>
              ) : (
                <>
                  <td>{detail.title}</td>
                  <td>{detail.content}</td>
                  <td>{detail.status}</td>
                  <td>{detail.date}</td>
                  <td>
                    <img
                      src={`data:${detail.image.contentType};base64,${detail.image.data}`}
                      alt={detail.title}
                      className="banner-image"
                    />
                  </td>
                  <td>
                    <FontAwesomeIcon style={{ cursor: 'pointer' }}
                      icon={faEdit}
                      className="edit-icon"
                      onClick={() => handleEdit(detail._id)}
                    />
                    <FontAwesomeIcon style={{ cursor: 'pointer' }}
                      icon={faTrash}
                      className="delete-icon"
                      onClick={() => handleDelete(detail._id)}
                    />
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnnouncementList;
