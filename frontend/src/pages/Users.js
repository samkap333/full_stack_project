import { useState, useEffect } from "react";

import React from 'react';
import UserModal from "./UserModal.js";
import UserList from "./UserList";

import { useAuth } from '../components/Authcontext';



function Users() {
    const [popupIsOpen, setpopupIsOpen] = useState(false);
  
    const { isAuthenticated } = useAuth();
   
  
    useEffect(() => {
      if (isAuthenticated) {
        setpopupIsOpen(false); 
      }
    }, [isAuthenticated]);
  
    function openModal() {
      setpopupIsOpen(true);
    }
  
    return (
      <>
        {popupIsOpen && (
          <UserModal
            popupIsOpen={popupIsOpen}
            setpopupIsOpen={setpopupIsOpen}
          />
        )}
  
        <div style={{ position: "relative" }}>
          <button className="button" style={{ position: "absolute", top: 0, right: 0 }} onClick={openModal}>
            + Add Users
          </button>
  
          <h1 style={{ fontWeight: "bold", color: "grey", margin: "20px" }}>
        Users
          </h1>
  
          <UserList />
        </div>
      </>
    );
  }
  
  export default Users;
  

