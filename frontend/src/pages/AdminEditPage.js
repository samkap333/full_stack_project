import React, { useState, useEffect } from 'react';
import { updateAdminInfo, getAdminInfo } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

export default function AdminEditPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    password: '',
    name: '',
    status: '',
    actions: {
      dashboard: false,
      createOffers: false,
      loanActivity: false,
      popupBanners: false,
      announcement: false,
      manageAdmins: false,
      users: false,
    },
  });

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await getAdminInfo(userId);
        const adminData = response.data;

        setFormData((prevFormData) => ({
          ...prevFormData,
          ...adminData,
          actions: {
            ...prevFormData.actions,
            ...adminData.actions.reduce((acc, action) => {
              acc[action] = true;
              return acc;
            }, {}),
          },
        }));
      } catch (error) {
        console.log('An error occurred while fetching admin data:', error);
      }
    };

    fetchAdminData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;

    if (name.startsWith('actions.')) {
      
      const actionName = name.split('.')[1];

      setFormData((prevFormData) => ({
        ...prevFormData,
        actions: {
          ...prevFormData.actions,
          [actionName]: newValue,
        },
      }));
    } else {
      
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: newValue,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("my data",formData)

    try {
      const response = await updateAdminInfo(userId, formData);

      console.log('Form submitted successfully');
      console.log('Response:', response.data);
      navigate('/admin');
    } catch (error) {
      console.log('An error occurred while submitting the form:', error);
    }
  };

  return (
    <div className="admin-edit-page">
      <h1>Edit Admin</h1>
      <form className="edit-admin-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <br />
          </div>
          <div className="input-container">
            <label htmlFor="phoneNumber">Mobile No.</label>
            <br />
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <br />
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <br />
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="form-group">
          <br />
          <hr />
          <h1>Actions:</h1>

          {Object.entries(formData.actions).map(([action, checked]) => (
            <div className="checkbox-item" key={action}>
              <input
                type="checkbox"
                id={action}
                name={`actions.${action}`} 
                checked={checked}
                onChange={handleInputChange}
              />
              <label htmlFor={action}>{action}</label>
            </div>
          ))}

          <br />

          <div className="form-group" style={{ textAlign: 'center' }}>
            <button type="submit" className="submit-button button">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
