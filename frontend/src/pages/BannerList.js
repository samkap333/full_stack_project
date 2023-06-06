import React, { useEffect, useState } from 'react';
import { getBannerInfo, deleteBanner, updateBanner, uploadBanner } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function BannerList() {
  const [details, setDetails] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    image: null,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getBannerInfo();
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

    const banner = details.find((detail) => detail._id === id);
    if (banner) {
      setFormData({
        title: banner.title,
        url: banner.url,
        image: banner.image,
      });
    }
  };

  const handleCancelEdit = () => {
    setEditId('');
    setEditMode(false);
    setFormData({
      title: '',
      url: '',
      image: null,
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteBanner(id);
      fetchData();
    } catch (error) {
      console.error('Error deleting banner:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('url', formData.url);
    if (formData.image) {
      data.append('image', formData.image);
    }

    if (editMode) {
      updateBanner(editId, data)
        .then((response) => {
          console.log('Banner updated successfully', response);
          setFormData({ title: '', url: '', image: null });
          setEditMode(false);
          fetchData();
        })
        .catch((error) => {
          console.error('Failed to update banner:', error);
        });
    } else {
      uploadBanner(data)
        .then((response) => {
          console.log('Banner uploaded successfully', response);
          setFormData({ title: '', url: '', image: null });
          fetchData();
        })
        .catch((error) => {
          console.error('Failed to upload banner:', error);
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
            <th>URL</th>
            <th>Image</th>
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
                    <input
                      type="url"
                      value={formData.url}
                      onChange={(event) =>
                        setFormData({ ...formData, url: event.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="file"
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          image: event.target.files[0],
                        })
                      }
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
                      onClick={handleCancelEdit}
                    />
                  </td>
                </>
              ) : (
                <>
                  <td>{detail.title}</td>
                  <td>{detail.url}</td>
                  <td>
                    <img
                      src={`data:${detail.image.contentType};base64,${detail.image.data}`}
                      alt={detail.title}
                      className="banner-image"
                    />
                  </td>
                  <td>
                    <FontAwesomeIcon
                      style={{ cursor: 'pointer' }}
                      icon={faEdit}
                      className="edit-icon"
                      onClick={() => handleEdit(detail._id)}
                    />
                    <FontAwesomeIcon
                      style={{ cursor: 'pointer' }}
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
}
