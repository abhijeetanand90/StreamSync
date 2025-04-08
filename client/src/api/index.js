import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });



export const signup=(formdata)=>API.post('/user/signup', formdata);
export const login=(formdata)=>API.post('/user/login', formdata);