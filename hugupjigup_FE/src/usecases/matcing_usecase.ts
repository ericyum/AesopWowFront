import type {CreateAndUpdateMatchingDto, MatchingListResponseDto, MatchingResponseDto} from "../domain/matching";
import apiClient from "../data/api_client";

export const createMatching =
  async (userId: number, matchingDto: CreateAndUpdateMatchingDto): Promise<MatchingResponseDto> => {
    const response = await apiClient.post(
      `/api/v1/matching/matching/${userId}`, matchingDto);
    if (response.status !== 201) {
      throw new Error("Failed to create matching");
    }

    return response.data.data;
};

export const getMatchingList = async (page: number=0, size: number=100, sort: string='updatedAt,desc'): Promise<MatchingListResponseDto> => {
  const response = await apiClient.get('/api/v1/matching/posts',
    {
        params: { page, size, sort }
      }
    );

  if(response.status !== 200) {
    throw new Error("Failed to get matching list");
  }

  return response.data.data;
}

export const updateMatching =
  async (matchingId: number, matchingDto: CreateAndUpdateMatchingDto): Promise<MatchingResponseDto> => {
    const response = await  apiClient.put(`/api/v1/matching/update/${matchingId}`, matchingDto);
    if(response.status !== 200) {
      throw new Error("Failed to update matching");
    }

    return response.data.data;
}

export const deleteMatching = async (matchingId: number): Promise<boolean> => {
  const response = await apiClient.delete(`/api/v1/matching/delete/${matchingId}`);
  if (response.status !== 200) {
    throw new Error("Failed to delete matching");
  }

  return response.data.result;
}
