import { useState, useEffect} from "react";
import { useNavigate ,useParams} from "react-router-dom";
import axios from "axios";

export default function EditUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(()=>{
    getUserById();
  },[])

  const getUserById = async() => {
      try{
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);
        setCity(response.data.city);
      }
      catch(error){
        console.log("Error while fetching the record of user.",error)
      }
  }

  const updateUser = async(e) =>{
    e.preventDefault();
    try{
      await axios.patch(`http://localhost:5000/users/${id}`,{
        name,
        email,
        city
      })
      navigate('/')
    }catch(error){
      console.log("Error occured in updating details",error)
    }
  }
  
  return (
    <div className="columns mt-5">
        <div className="column is-half">
            <form onSubmit={(e)=>updateUser(e)}>
              <div className="field">
                <label htmlFor="name" className="label"> Name</label>
                <input type="text" value={name} 
                        className="input"
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter name"
                />
              </div>

              <div className="field">
                <label htmlFor="email" className="label"> Email</label>
                <input type="email" value={email} 
                        className="input"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                />
              </div>

              <div className="field">
                <label htmlFor="city" className="label"> City</label>
                <input type="city" value={city} 
                        className="input"
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter city"
                />
              </div>

              <div className="field">
                  <div className="control">
                    <button type="submit" className="button is-success">
                        Update
                    </button>
                  </div>
              </div>
            </form>
        </div>
    </div>
  )
}

