import React, { useEffect, useState } from 'react';
import { userInfo, deleteUser } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTrash, faMapMarkerAlt, faBook, faCamera } from '@fortawesome/free-solid-svg-icons';

export default function DetailsPage() {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await userInfo();
      const data = response.data;
      const sortedData = data.reverse();
      setDetails(sortedData);
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };

  
  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      fetchData();
    } catch (error) {
      console.error('Error deleting banner:', error);
    }
  };

  return (
    <div className="details-page">
      <table className="banner-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>NRIC no.</th>
            <th>Reffral no.</th>
            <th>Bank Name</th>
            <th>Account Name</th>
            <th>Bank Account No.</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {details.map((detail) => (
            <tr key={detail._id}>
              <td>{detail.name}</td>
              <td>{detail.phoneNumber}</td>
              <td>{detail.nric}</td>
              <td>{detail.refferal}</td>
              <td>{detail.bankname}</td>
              <td>{detail.accountname}</td>
              <td>{detail.accountNumber}</td>
              <td>
                <FontAwesomeIcon
                  icon={faMapMarkerAlt} style={{ cursor: 'pointer' }}
                  className="location-icon"
                />
                {' '}
              
                <FontAwesomeIcon style={{ cursor: 'pointer' }}
                  icon={faBook}
                  className="diary-icon"
                />
                {' '}
                <FontAwesomeIcon style={{ cursor: 'pointer' }}
                  icon={faCamera}
                  className="media-icon"
                />
                {' '}
                <FontAwesomeIcon style={{ cursor: 'pointer' }}
                  icon={faTrash}
                  className="delete-icon"
                  onClick={() => handleDelete(detail._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
