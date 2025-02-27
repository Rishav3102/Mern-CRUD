import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
const URL = "http://localhost:5000/api/auth/login";
import { toast } from 'react-toastify';
export const Login = () => {
    const[user , setUser] = useState({
        email:"",
        password:"",
    });
    const navigate = useNavigate();
    const {storeTokenInLS , userAuthentication} = useAuth();
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name] : value
        })
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
            if(response.ok){
                storeTokenInLS(resp_data.token);
                userAuthentication();
                toast.success("Login Successful");
                setUser({email:"" , password:""});
                navigate("/");
            }
            else{
                toast.error(resp_data.extraDetails ? resp_data.extraDetails : resp_data.message);
            }
        }
        catch(error){

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
                                    src="/images/login.png" 
                                    alt="Fill the login form"
                                    width="500"
                                    height="500"
                                />
                            </div>
                            <div className="registration-form">
                                <h1 className="main-heading mb-3">Login Form</h1>
                                <br/>

                                <form onSubmit={handleSubmit}>
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
                                    <button type="submit" className="btn btn-submit">Log in</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    )
};