import React ,{useState}from 'react';
import { uploadNotification } from '../services/api';
import AnnouncementList from './AnnoucementList';
import { useNavigate } from 'react-router-dom';
import {AnnouncementConfirm } from './AnnouncementConfirm';
const Announcement =() =>{
  
  const [formData, setFormData] = React.useState({
    title: '',
    content: '',
    status: '',
    date: '',
    image: null,
  });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  

  const handleSubmit = async (event) => {
    event.preventDefault();

    
    const formDataObj = new FormData();
    formDataObj.append('title', formData.title);
    formDataObj.append('content', formData.content);
    formDataObj.append('status', formData.status);
    formDataObj.append('date', formData.date);
    formDataObj.append('image', formData.image);

    uploadNotification(formDataObj)
    .then((response) => {
      console.log('Banner uploaded successfully', response);
      setFormData({ title: '', content: '', status: '',date:'',image: null });
      
      setShowModal(true);
      navigate('/notify')
    })
    .catch((error) => {
      console.error('Failed to upload banner:', error);
    });
};
  return (
    <div className="admin-add-page">
      <h1>Announcement/Notification List</h1>
      <form className="add-campaign-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <br/>
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
        <div className="form-group">
          <label htmlFor="description">Content</label>
          <br/>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={(event) =>
              setFormData({ ...formData, content: event.target.value })
            }
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <br />
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={(event) =>
              setFormData({ ...formData, status: event.target.value })
            }
          >
            <option value="">Open this select menu</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="date">Publish date</label>
          <br/>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={(event) =>
              setFormData({ ...formData, date: event.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <br/>
          <input
            type="file"
            id="image"
            name="image"
            onChange={(event) =>
                setFormData({ ...formData, image: event.target.files[0] })
              }
          />
        </div>
        <div className="form-group" style={{ textAlign: 'center' }}>
          <button type="submit" className="submit-button button">
            Submit
          </button>
        </div>
      </form>. <AnnouncementConfirm
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
      />

      <AnnouncementList />
    </div>
  );
}

export default Announcement