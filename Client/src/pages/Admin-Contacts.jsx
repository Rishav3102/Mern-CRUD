import { useEffect,useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';

export const AdminContacts = () => {
    const [contactData , setContactData] = useState([]);
    const { authorizationToken } = useAuth();
    const getContactsData = async () => {
        try{
            const response = await fetch(`http://localhost:5000/api/admin/contacts`,{
                method : "GET",
                headers : {
                    Authorization: authorizationToken,
                }
            });
            const data = await response.json();
            if(response.ok){
                setContactData(data);
            }
        }
        catch(error){
            console.log(error);
        }
    }

    const deleteContact = async (id) => {
        try{
            const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                }
            });
            if(response.ok){
                toast.success("Contact Deleted Successfully");
                getContactsData();
            }
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getContactsData();
    },[]);

    return(
        <>
            <section className="admin-contacts-section">
                <h1>Admin Contact Data</h1>
                <div className="container admin-users">
                    {contactData.map((curContactData , index) => {
                        const {username , email , message , _id} = curContactData;
                        return(
                            <div key={index}>
                                <p>{username}</p>
                                <p>{email}</p>
                                <p>{message}</p>
                                <button className="btn" onClick={() => deleteContact(curContactData._id)}>Delete</button>
                            </div>
                        );
                    })}
                </div>
            </section>
        </>
    );
    // return <>
    //     {
    //         contactData.map((curContactData , index)=>{
    //             return <p key={index}>{curContactData.username}</p>
    //         })
    //     }
    // </>
};