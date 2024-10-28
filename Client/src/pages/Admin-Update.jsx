import { useState,useEffect } from "react";
import {useNavigate , useParams} from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';
export const AdminUpdate = () => {
    const {id} = useParams();
    const { authorizationToken } = useAuth();
    useEffect(() => {
        getUserDataById();
    },[]);

    const getUserDataById = async ()=>{
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                }
            });
            const data = await response.json();
            console.log(`user ${data}`);
            setUser(data);
        }
        catch (error) {
            next(error);
        }
    }
    const [user , setUser] = useState({
        username:"",
        email:"",
        phone:"",
    });
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({
            ...user,
            [name] : value,
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch(`http://localhost:5000/api/admin/users/update/${id}` , {
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json",
                    Authorization: authorizationToken
                },
                body:JSON.stringify(user),
            });
            const resp_data = await response.json();
            if(response.ok){
                setUser(user);
                toast.success("User Updated Successful");
            }
            else{
                toast.error(resp_data.extraDetails ? resp_data.extraDetails : resp_data.message);
            }
        }
        catch(error){
            console.log("Update ", error);
        }
    }
    return(
        <>
            <section>
                <main>
                    <div className="section-registration">
                        <div className="container grid grid-two-cols">
                            
                            <div className="registration-form">
                                <h1 className="main-heading mb-3">Update User Information</h1>
                                <br/>

                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="username">Username</label>
                                        <input
                                            type="text"
                                            name="username"
                                            placeholder="Username"
                                            required
                                            autoComplete="off"
                                            value={user.username}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            required
                                            autoComplete="off"
                                            value={user.email}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone">Phone</label>
                                        <input
                                            type="number"
                                            name="phone"
                                            placeholder="Phone"
                                            required
                                            autoComplete="off"
                                            value={user.phone}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <br/>
                                    <button type="submit" className="btn btn-submit">Update</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    )
};