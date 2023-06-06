
import React from 'react';
import Modal from 'react-modal';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addNewUser } from '../services/api'

export default function UserModal(props) {

  const { popupIsOpen, setpopupIsOpen } = props
  const [formData, setFormData] = React.useState({
    name: '',
    phoneNumber: '',
    nric: '',
    refferal: '',
    bankname: '',
    accountname:'',
    accountNumber:'',
    image:null,
    location:''
  
  });



  function closeModal() {
    setpopupIsOpen(false);
  }
  function handleSubmit(event) {
    event.preventDefault();
    addNewUser(formData,formData.userType).then(() => {
      console.log('User added successfully');
      window.location.reload()
      closeModal();
    }).catch(error => {
      console.log('Error registering user: ', error);
      if (error.response && error.response.data) {
        console.log('Server error:', error.response.data);
      } else {
        console.log('Network error:', error.message);
      }
    });
  }



  return (



    <>
      <Modal
        isOpen={popupIsOpen}
        className="custom-modal"

      >

        <h2>Add New User</h2>
        <div className="close-icon" onClick={closeModal}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name"> Name</label>
          <br></br><br></br>
          <input
            type="String"
            id="name"
            name="name"
            required
            pattern="[A-Za-z]+"
            value={formData.name}
            onChange={(event) =>
              setFormData({ ...formData, name: event.target.value })
            }
          />
          <br></br><br></br>

          <label htmlFor="phoneNumber">Phone Number</label>
          <br></br><br></br>

          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={(event) =>
              setFormData({ ...formData, phoneNumber: event.target.value })
            }
          />
          <br/><br/>
          <label htmlFor="nric">NRIC no.</label>
          <br></br><br></br>

          <input
            type="number"
            id="nric"
            name="nric"
            value={formData.nric}
            onChange={(event) =>
              setFormData({ ...formData, nric: event.target.value })
            }
          />
           <br/><br/>
          <label htmlFor="refferal">Reffral no.</label>
          <br></br><br></br>

          <input
            type="number"
            id="refferal"
            name="refferal"
            value={formData.refferal}
            onChange={(event) =>
              setFormData({ ...formData, refferal: event.target.value })
            }
          />
           <br/><br/>
          <label htmlFor="email">Bank Name</label><br/><br/>
          <input
            type="String"
            id="bankname"
            name="bankname"
            value={formData.bankname}
            onChange={(event) =>
              setFormData({ ...formData, bankname: event.target.value })
            }
          />
          <br/><br/>
          <label htmlFor="accountname">Account Name</label><br/><br/>
          <input
            type="String"
            id="accountname"
            name="accountname"
           
            value={formData.accountname}
         
            onChange={(event) =>
              setFormData({ ...formData, accountname: event.target.value })
            }
          />
           <br/><br/>
           <label htmlFor="accountNumber">Bank Account No.</label><br/><br/>
          <input
            type="number"
            id="accountNumber"
            name="accountNumber"
           
            value={formData.accountNumber}
         
            onChange={(event) =>
              setFormData({ ...formData, accountNumber: event.target.value })
            }
          />
           <br/><br/>
           <label htmlFor="location">Image</label><br/><br/>
           <input
            type="file"
            id="image"
            name="image"
            onChange={(event) =>
              setFormData({ ...formData, image: event.target.files[0] })
            }
          />
           <br/><br/>
           <label htmlFor="location">Location</label><br/><br/>
          <input
            type="String"
            id="location"
            name="location"
           
            value={formData.location}
         
            onChange={(event) =>
              setFormData({ ...formData, location: event.target.value })
            }
          />
           <br/><br/>
          <button type="submit" className="center-button" style={{ width: '150px' }}  >Add User</button>
        </form>
      </Modal>

    </>
  );
} 