import React,{useState,useEffect} from 'react';
import { uploadMainBanner,getMainBannerInfo } from '../services/api';

export default function Settings() {
  const [details, setDetails] = useState([]);
  const [formData, setFormData] = React.useState({
    
    image: '',

  });
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData();

    data.append('image', formData.image);

    uploadMainBanner(data)
      .then((response) => {
        console.log('Banner uploaded successfully', response);
        setFormData({image: null });
        fetchData();
        
        
       
      })
      .catch((error) => {
        console.error('Failed to upload banner:', error);
      });
  };
  
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getMainBannerInfo();
      const data = response.data;
      const sortedData = data.reverse();
      setDetails(sortedData);
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };


  

  return(
    <>
    <h1>Settings</h1>
    <form className="add-campaign-form" onSubmit={handleSubmit}>
    <input
  type="file"
  id="image"
  name="image"
  onChange={(event) =>
    setFormData({ ...formData, image: event.target.files[0] })
  }
/>

        <br/>
        <div className="form-group" style={{ textAlign: 'center' }}>
            <button type="submit" className="submit-button button">
              Submit
            </button>
          </div>
          </form>
          <table className="banner-table">
        <thead>
          <tr>
            
            <th> Banner Image</th>
            
          </tr>
        </thead>
        <tbody>
          {details.map((detail) => (
            <tr key={detail._id}>
              <td>
                <img
                  src={`data:${detail.image.contentType};base64,${detail.image.data}`}
                  alt={detail.title}
                  className="banner-image"
                />
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
        </>
  
        )
}