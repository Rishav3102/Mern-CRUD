import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../store/auth";
const URL = "http://localhost:5000/api/auth/register";
import { toast } from 'react-toastify';
export const Register = () => {
    const [user , setUser] = useState({
        username:"",
        email:"",
        phone:"",
        password:""
    });
    const navigate = useNavigate();
    const {storeTokenInLS} = useAuth();
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
            const response = await fetch(URL , {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(user),
            });
            const resp_data = await response.json();
            console.log(resp_data);
            if(response.ok){
                storeTokenInLS(resp_data.token);
                setUser(
                    {username:"", email:"", phone:"", password:""}
                );
                toast.success("Regisstration Successful");
                navigate("/");
            }
            else{
                toast.error(resp_data.extraDetails ? resp_data.extraDetails : resp_data.message);
            }
        }
        catch(error){
            console.log("register ", error);
        }
    }
    return(
        <>
            <section>
                <main>
                    <div className="section-registration">
                        <div className="container grid grid-two-cols">
                            <div className="registration-image">
                                <img 
                                    src="/images/register.png" 
                                    alt="Trying yo fill the form"
                                    width="500"
                                    height="500"
                                />
                            </div>
                            <div className="registration-form">
                                <h1 className="main-heading mb-3">Registration Form</h1>
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
                                    <div>
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            required
                                            autoComplete="off"
                                            value={user.password}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <br/>
                                    <button type="submit" className="btn btn-submit">Register Now</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    )
};