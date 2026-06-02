import api from "@/lib/api";
import {
  IApiResponse,
  ILoginInput,
  IRegisterInput,
  IUpdateProfileInput,
  IUser,
} from "@/types/auth.types";

const unwrapUser = (response: IApiResponse<{ user: IUser }>): IUser => {
  return response.data.user;
};

export const authService = {
  async register(data: IRegisterInput): Promise<IUser> {
    const response = await api.post<IApiResponse<{ user: IUser }>>("/auth/register", data);
    return unwrapUser(response.data);
  },

  async login(data: ILoginInput): Promise<IUser> {
    const response = await api.post<IApiResponse<{ user: IUser }>>("/auth/login", data);
    return unwrapUser(response.data);
  },

  async logout(): Promise<void> {
    await api.post("/auth/logout");
  },

  async getMe(): Promise<IUser> {
    const response = await api.get<IApiResponse<{ user: IUser }>>("/auth/me");
    return unwrapUser(response.data);
  },

  async updateProfile(data: IUpdateProfileInput): Promise<IUser> {
    const formData = new FormData();

    if (data.name !== undefined) {
      formData.append("name", data.name);
    }

    if (data.avatar !== undefined) {
      formData.append("avatar", data.avatar);
    }

    const response = await api.patch<IApiResponse<{ user: IUser }>>("/users/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return unwrapUser(response.data);
  },

  async deleteAccount(): Promise<void> {
    await api.delete("/users/me");
  },
};
