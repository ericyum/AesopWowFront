import apiClient from "../data/api_client";
import type {ApplicationDto, ApplicationQueueResponseDto, UpdateApplicationDto} from "../domain/application_queue";

export const createApplication =
  async (matchingId: number, applicationDto: ApplicationDto): Promise<ApplicationQueueResponseDto> => {
    const response = await apiClient.post(`/api/v1/apply/${matchingId}`, applicationDto);
    if (response.status !== 201) {
      throw new Error("Failed to create application");
    }

    return response.data.data;
};

export const updateApplication =
  async (applicationId: number, updateApplicationDto: UpdateApplicationDto): Promise<ApplicationQueueResponseDto> => {
    const response = await apiClient.put(`/api/v1/apply/${applicationId}`, updateApplicationDto);
    if (response.status !== 200) {
      throw new Error("Failed to update application");
    }

    return response.data.data;
};

export const getApplicationListByUserId =
  async (userId: number): Promise<ApplicationQueueResponseDto[]> => {
    const response = await apiClient.get(`/api/v1/apply/user/${userId}`);
    if (response.status !== 200) {
      throw new Error("Failed to get application list");
    }

    return response.data.data;
};

export const getApplicationListByMatchingId =
  async (matchingId: number): Promise<ApplicationQueueResponseDto[]> => {
    const response = await apiClient.get(`/api/v1/apply/matching/${matchingId}`);
    if (response.status !== 200) {
      throw new Error("Failed to get application list");
    }

    return response.data.data;
};

export const deleteApplication = async (applicationId: number): Promise<boolean> => {
  const response = await apiClient.delete(`/api/v1/apply/${applicationId}`);
  if (response.status !== 200) {
    throw new Error("Failed to delete application");
  }

  return response.data.result;
};

