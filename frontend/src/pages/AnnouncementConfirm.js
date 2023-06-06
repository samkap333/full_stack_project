import Modal from 'react-modal';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const AnnouncementConfirm = ({ isOpen, onRequestClose }) => {

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        className="custom-modal"
      >
        <h3>Notification Added successfully</h3>
        <div className="close-icon" onClick={onRequestClose}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <button className='button' onClick={() => {onRequestClose();window.location.reload();}}>Continue</button>
      </Modal>
    )
  };
  