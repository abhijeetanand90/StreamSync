import { jwtDecode } from "jwt-decode";

 
 
 export const tokenUtils={
getToken:()=>localStorage.getItem('token'),
setToken:(token)=>localStorage.setItem('token', token),
removeToken:()=>localStorage.removeItem('token'),
isTokenValid:(token)=>{
    if(!token) return false;
    try {
        const decoded=jwtDecode(token)
        return decoded
    } catch  {
        return false
    }
}
 }