import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

export const checkAuth = (Component) =>{
    function Wrapper(props){
        var user = localStorage.getItem('token');
        var navigate = useNavigate();
        useEffect(()=>{
            if(!user){
                const message = "Please log in to access this page";
                navigate(`/login/${message}`);
            }
        },[user]);
        return <Component {...props}/>;
    }
    return Wrapper;
}

export default checkAuth;