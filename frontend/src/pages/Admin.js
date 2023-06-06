import { useState, useEffect } from "react";
import { useNavigate} from 'react-router-dom';
import React from 'react';
import { adminInfo } from '../services/api'

import AdminList from "./AdminList";

import { useAuth } from '../components/Authcontext';


function Users() {
  const [users, setUsers] = useState([]);
  const navigate=useNavigate();




  const { isAuthenticated } = useAuth();
  const token = localStorage.getItem('token');




  useEffect(() => {

    if (isAuthenticated) {

      adminInfo()
        .then(data => {

          setUsers(data.data)
        })
        .catch(error => console.error(error));
    }
  }, [isAuthenticated, setUsers, token]);




  


  return (
    <>
      

      <div style={{ position: "relative" }}>
        <button
          className="button" style={{ position: "absolute", top: 0, right: 0 }} onClick={()=> navigate('/addadmin')}>
          + Add New
        </button>

        <h1 style={{ fontWeight: "bold", color: "grey", margin: "20px" }}>
          <strong>
            Admin List
          </strong>
        </h1>

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No.</th>
              <th>Status</th>


            </tr>
          </thead>
          <tbody>
            {users.map((user) => (

              <AdminList user={user}
                users={users}
                setUsers={setUsers} />

            ))}

          </tbody>
        </table>

      </div>
    </>
  );
}

export default Users;


