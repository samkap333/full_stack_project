import React from 'react';
import { addNewAdmin } from '../services/api'
import {useNavigate} from 'react-router-dom'
export default function AdminAddPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: '',
    phoneNumber: '',
    password: '',
    name: '',
    status: '',
    dashboard: false,
    createOffers: false,
    loanActivity: false,
    popupBanners: false,
    announcement: false,
    manageAdmins: false,
    users: false,
  });

  const [errors, setErrors] = React.useState({
    email: '',
    phoneNumber: '',
    password: '',
    name: '',
  });

  const validateForm = () => {
    let isValid = true;
    const updatedErrors = {
      email: '',
      phoneNumber: '',
      password: '',
      name: '',
    };

    if (!formData.email) {
      updatedErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      updatedErrors.email = 'Invalid email format';
      isValid = false;
    }

    if (!formData.phoneNumber) {
      updatedErrors.phoneNumber = 'Phone number is required';
      isValid = false;
    } else if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
      updatedErrors.phoneNumber = 'Invalid phone number';
      isValid = false;
    }

    if (!formData.password) {
      updatedErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      updatedErrors.password = 'Password should be at least 6 characters long';
      isValid = false;
    }

    if (!formData.name) {
      updatedErrors.name = 'Name is required';
      isValid = false;
    }

    setErrors(updatedErrors);
    return isValid;
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (validateForm()) {
      try {
        const response = await addNewAdmin({
          ...formData,
          actions: Object.keys(formData).filter((key) => formData[key] === true),
        });
  
        console.log('Form submitted successfully');
        navigate('/admin')
        console.log('Response:', response.data);
        setFormData({
          email: '',
          phoneNumber: '',
          password: '',
          name: '',
          status: '',
          dashboard: false,
          createOffers: false,
          loanActivity: false,
          popupBanners: false,
          announcement: false,
          manageAdmins: false,
          users: false,
        });
      } catch (error) {
        console.log('An error occurred while submitting the form:', error);
      }
    } else {
      console.log('Form validation failed');
    }
  };
  
  
  
  


  return (
    <div className="admin-add-page">
      <h1>Add Admin</h1>
      <form className="add-campaign-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <br/>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(event) =>
                setFormData({ ...formData, email: event.target.value })
              }
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
            <br/>
          </div>
          <div className="input-container">
            <label htmlFor="phoneNumber">Mobile No.</label>
            <br/>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={(event) =>
                setFormData({ ...formData, phoneNumber: event.target.value })
              }
              className={errors.phoneNumber ? 'error' : ''}
            />
            {errors.phoneNumber && (
              <p className="error-message">{errors.phoneNumber}</p>
            )}
          </div>
        </div>
        <div className= "form-group">
          <label htmlFor="password">Password</label>
          <br/>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={(event) =>
              setFormData({ ...formData, password: event.target.value })
            }
            className={errors.password ? 'error' : ''}
          />
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <br/>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={(event) =>
              setFormData({ ...formData, name: event.target.value })
            }
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <br/>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={(event) =>
              setFormData({ ...formData, status: event.target.value })
            }
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="form-group">
          <br/>
        <hr/>
  <h1>Actions:</h1>
  
  
  <div className="checkbox-item">
    <input
      type="checkbox"
      id="dashboard"
      name="dashboard"
      checked={formData.dashboard}
      onChange={(event) =>
        setFormData({ ...formData, dashboard: event.target.checked })
      }
    />
    <label htmlFor="dashboard">Dashboard</label>
  </div>
  
  
  
  <div className="checkbox-item">
    <input
      type="checkbox"
      id="createOffers"
      name="createOffers"
      checked={formData.createOffers}
      onChange={(event) =>
        setFormData({ ...formData, createOffers: event.target.checked })
      }
    />
    <label htmlFor="createOffers">Create Offers</label>
  </div>


  
  <div className="checkbox-item">
    <input
      type="checkbox"
      id="loanActivity"
      name="loanActivity"
      checked={formData.loanActivity}
      onChange={(event) =>
        setFormData({ ...formData, loanActivity: event.target.checked })
      }
    />
    <label htmlFor="loanActivity">Loan Activity</label>
  </div>
  
 
  
  <div className="checkbox-item">
    <input
      type="checkbox"
      id="popupBanners"
      name="popupBanners"
      checked={formData.popupBanners}
      onChange={(event) =>
        setFormData({ ...formData, popupBanners: event.target.checked })
      }
    />
    <label htmlFor="popupBanners">Popup Banners</label>
  </div>

  
  <div className="checkbox-item">
    <input
      type="checkbox"
      id="announcement"
      name="announcement"
      checked={formData.announcement}
      onChange={(event) =>
        setFormData({ ...formData, announcement: event.target.checked })
      }
    />
    <label htmlFor="announcement">Announcement</label>
  </div>

  
  <div className="checkbox-item">
    <input
      type="checkbox"
      id="manageAdmins"
      name="manageAdmins"
      checked={formData.manageAdmins}
      onChange={(event) =>
        setFormData({ ...formData, manageAdmins: event.target.checked })
      }
    />
    <label htmlFor="manageAdmins">Manage Admins</label>
  </div>
  

  
  <div className="checkbox-item">
    <input
      type="checkbox"
      id="users"
      name="users"
      checked={formData.users}
      onChange={(event) =>
        setFormData({ ...formData, users: event.target.checked })
      }
    />
    <label htmlFor="users">Users</label>
  </div>
</div>


<div className="form-group" style={{ textAlign: 'center' }}>
  <button type="submit" className="submit-button button">
    Submit
  </button>
</div>

      </form>
    </div>
  );
}
