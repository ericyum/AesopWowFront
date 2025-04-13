import type {
  UpdateMenteeProfileDto,
  UpdateMentorProfileDto,
  UpdateUserInfoDto,
  UpdateUserInfoResponseDto,
  UserInfo
} from "../domain/user_profile";
import apiClient from "../data/api_client";

export const getUserInfo = async (id: number): Promise<UserInfo> => {
  const response = await apiClient.get(`/api/v1/user/${id}`);
  if (response.status !== 200) {
    throw new Error("Failed to get user info");
  }

  return response.data.data;
}

export const updateUserInfo =
  async (id: number, updateUserInfoDto: UpdateUserInfoDto): Promise<UpdateUserInfoResponseDto> => {
    const response = await apiClient.put(`/api/v1/user/${id}`, updateUserInfoDto);
    if (response.status !== 200) {
      throw new Error("Failed to update user info");
    }

    return response.data.data;
}

export const updateMentorProfile =
  async (id: number, updateMentorProfileDto: UpdateMentorProfileDto): Promise<UpdateMentorProfileDto> => {
    const response = await apiClient.put(`/api/v1/user/${id}/mentor`, updateMentorProfileDto);
    if (response.status !== 200) {
      throw new Error("Failed to update mentor profile");
    }

    return response.data.data;
}

export const updateMenteeProfile =
  async (id: number, updateMenteeProfileDto: UpdateMenteeProfileDto): Promise<UpdateMenteeProfileDto> => {
    const response = await apiClient.put(`/api/v1/user/${id}/mentee`, updateMenteeProfileDto);
    if (response.status !== 200) {
      throw new Error("Failed to update mentee profile");
    }

    return response.data.data;
  }
