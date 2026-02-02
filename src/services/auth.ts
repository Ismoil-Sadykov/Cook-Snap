import axiosRequest from "../utils/axios";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
}

export const login = async (data: LoginPayload) => {
  const response = await axiosRequest.post<LoginResponse>("/api/users/token/", data);
  return response.data;
};
