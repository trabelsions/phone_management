import { Env } from "config/Env";
import makeApi from "libs/core/configureAxios";
import { LoginReq, LoginRes, RegisterReq, RegisterRes } from "../types";
import { promises } from "dns";

const api = makeApi(`${Env.API_BASE_URL}`);

export const login = (data: LoginReq): Promise<LoginRes> =>
  api.post(`/auth/login`, data);

export const register = (data: RegisterReq): Promise<RegisterRes> =>
  api.post(`/auth/register`, data);

export const getCurrent = (): Promise<RegisterRes> => api.get(`/api/current`);

export const registerAgent = (data: any): Promise<any> => api.post(`/agents`, data);
export const getAllAgent = (): Promise<any> => api.get('/agents')
export const deleteAgent = (id: any): Promise<any> => api.delete(`/agents/${id}`)
export const updateAgent = (data : any): Promise<any> => api.put(`/agents/${data.id}`,data)
export const getAgentById = (id:any): Promise<any> => api.get(`/agents/agent/${id}`)
export const shercheAgent = (name:any): Promise<any> => api.get(`/agents/search/${name}`)
export const findgroups = (): Promise<any> => api.get(`/agents/groups`)
export const filterdAgent = (data:any): Promise<any> => api.get(`/agents/filter?${data}`)
export default {
  login,
  register,
  getCurrent,
};
