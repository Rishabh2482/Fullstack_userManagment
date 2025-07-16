import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

export default function UserList() {
    const [users, setUser] = useState([]);  // users from database are stored in this state

    const getUsers = async ()=> {
        try{
            const response = await axios.get('http://localhost:5000/users'); // Fetch users from the backend
            
            setUser(response.data); 
        }catch(error){
            console.error("Error fetching users:", error);
        }
    }

    const deleteUser = async (id)=>{
        try{
            const response = await axios.delete(`http://localhost:5000/users/${id}`);
            // setUser(response);
            console.log(response);
            getUsers();
        }catch(error){
            console.log("Error deleting user", error)
        }
    }

    useEffect(()=>{
        getUsers();
    },[])           // can we pass users into dependency array.

  return (
    <div>
      <Link to="/add">
        Add new user
      </Link>

      <table>
        <thead>
            <tr>
                <th>NO.</th>
                <th>Name</th>
                <th>Email</th>
                <th>City</th>
                <th>Action</th>
            </tr>
        </thead>

        <tbody>
            {users.map((user,index)=>{
                return(
                    <tr key={user._id}>
                        <td>{index+1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.city}</td>
                        <td>
                            <Link to={`/edit${user._id}`}>
                                Edit
                            </Link>
                            <button onClick={()=> deleteUser(user._id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                )
            })}
        </tbody>
      </table>
    </div>
  )
}
