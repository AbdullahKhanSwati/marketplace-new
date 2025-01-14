import {useState,useContext,createContext ,useEffect} from "react";
import axios from "axios";
const authContext = createContext();

const AuthProvider = ({children})=>{
const [auth ,setAuth] = useState({
    admin:null,
    token:""
})
axios.defaults.headers.common['Authorization'] = auth?.token; 
useEffect(()=>{
const data = localStorage.getItem("auth");
if(data){
    const parseData = JSON.parse(data);
    setAuth({
        ...auth,
        admin:parseData.admin,
        token:parseData.token
    })
}
},[auth.token])

return(
    <authContext.Provider value = {[auth,setAuth]}>

       {children}
    </authContext.Provider>
)

}
 const useAuth = ()=> useContext(authContext);

 export {useAuth , AuthProvider};