import { createContext, useContext , useEffect, useState} from "react";


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
   
    const [token , setToken] = useState(localStorage.getItem("token"));
    const [user , setUser] = useState("");
    const [isLoading , setIsLoading] = useState(true);
    const [services , setServices] = useState([]);
    const authorizationToken = `Bearer ${token}`;
    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem("token" , serverToken)
    };
    useEffect(() => {
        if (token) {
            userAuthentication();  // Call authentication when token changes
        }
    }, [token]);  
    let isLoggedIn = !!token;
    
    const LogoutUser = () => {
        setToken("");   
        setUser("");
        return localStorage.removeItem('token');
    }
    
    const userAuthentication = async() => {
        try{
            setIsLoading(true);
            const response = await fetch("http://localhost:5000/api/auth/user",
            {
                method:"GET",
                headers:{
                    Authorization: authorizationToken,
                }
            });
            if(response.ok){
                const data = await response.json();
                setUser(data.userData);
                setIsLoading(false);
            }
            else{
                setIsLoading(false);
            }
        }
        catch(error){
            console.log("Error fetching user data");
        }
    }

    const getServices = async() => {
        try{
            const response = await fetch("http://localhost:5000/api/data/service",{
                method : "GET",
            });
            if(response.ok){
                const data = await response.json();
                setServices(data.msg);
            }
        }
        catch(error){
            console.log(`services frontend error : ${error}`);

        }
    }

    useEffect(() => {
        getServices();
        userAuthentication();
    },[]);

    return <AuthContext.Provider value={{isLoggedIn , storeTokenInLS , LogoutUser , user , services , authorizationToken , userAuthentication , isLoading}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if(!authContextValue){
        throw new Error("useAuth used outside  of the Provider")
    }
    return authContextValue;
}