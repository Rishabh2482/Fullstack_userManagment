import { useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const addUser = async(e)  => {
    e.preventDefault();

    try{
          const response =await axios.post('http://localhost:5000/users',{
              name,
              email,
              city
            })
            console.log(response);
          navigate('/');
    }catch(error){
      console.log("error occured whild adding data", error)
    }
  }

  return (
    <div className="columns mt-5">
        <div className="column is-half">
            <form onSubmit={(e)=>addUser(e)}>
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
                        Add user
                    </button>
                  </div>
              </div>
            </form>
        </div>
    </div>
  )
}
