import React, { useState } from 'react';
import { uploadBanner } from '../services/api';
import BannerList from './BannerList';
import { BannerConfirm } from './BannerConfirm';


export default function Banner() {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    image: null,
  });
  const [showModal, setShowModal] = useState(false);
 

 

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('url', formData.url);
    data.append('image', formData.image);

    uploadBanner(data)
      .then((response) => {
        console.log('Banner uploaded successfully', response);
        setFormData({ title: '', url: '', image: null });
    
    
        
        setShowModal(true);
        
       
      })
      .catch((error) => {
        console.error('Failed to upload banner:', error);
      });
  };

  return (
    <div className="admin-add-page">
      <h1>Pop Up Banner</h1>
      <form className="add-campaign-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Title</label>
          <br />
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={(event) =>
              setFormData({ ...formData, title: event.target.value })
              
            }
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="description">Url</label>
          <br />
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={(event) =>
              setFormData({ ...formData, url: event.target.value })
            }
          />
        </div>

        <br />

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <br />
          <input
            type="file"
            id="image"
            name="image"
            onChange={(event) =>
              setFormData({ ...formData, image: event.target.files[0] })
            }
          />
        </div>

        <br />
        <div className="form-group" style={{ textAlign: 'center' }}>
          <button type="submit" className="submit-button button">
            Submit
          </button>
        </div>
        
      </form>


      <BannerConfirm
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
      />

      <BannerList />
    </div>
  );
}

