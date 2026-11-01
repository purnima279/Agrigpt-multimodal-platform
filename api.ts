import axios from 'axios';import {useAuth,AuthResponse} from '../store/auth';
export const api=axios.create({baseURL:'/api'});
api.interceptors.request.use(c=>{const t=useAuth.getState().auth?.token;if(t)c.headers.Authorization=`Bearer ${t}`;return c;});
api.interceptors.response.use(r=>r,e=>{if(e.response?.status===401&&useAuth.getState().auth)useAuth.getState().logout();return Promise.reject(e);});
export interface Farm{id:number;name:string;sizeHectares:number;region?:string;soilType?:string;irrigationMethod?:string}
export type FarmInput=Omit<Farm,'id'>;
export const register=(d:{email:string;password:string;fullName:string;preferredLanguage:string})=>api.post<AuthResponse>('/auth/register',d).then(r=>r.data);
export const login=(d:{email:string;password:string})=>api.post<AuthResponse>('/auth/login',d).then(r=>r.data);
export const listFarms=()=>api.get<Farm[]>('/farms').then(r=>r.data);
export const createFarm=(f:FarmInput)=>api.post<Farm>('/farms',f).then(r=>r.data);
export const deleteFarm=(id:number)=>api.delete(`/farms/${id}`);
export interface MultimodalResponse{demoMode:boolean;inputsReceived:string[];farmContext:Record<string,string>;vision:{status:string;note:string;observations:string[]}|null;answer:string|null;limitations:string[]}
export const analyze=(fd:FormData)=>api.post<MultimodalResponse>('/multimodal/analyze',fd).then(r=>r.data);
export const errorMessage=(e:unknown)=>{const d=(e as {response?:{data?:{message?:string;error?:string}}}).response?.data;return d?.error??d?.message??'Request failed. Is the backend running?';};
