import type {
  CreateMentoringCommentDto,
  MentoringCommentResponse,
  UpdateMentoringCommentDto
} from "../domain/mentoring_comment";
import apiClient from "../data/api_client";

export const createMentoringComment =
  async (matchingId: number, createMentoringCommentDto: CreateMentoringCommentDto): Promise<boolean> => {
    const response = await apiClient.post(`/api/v1/matching/${matchingId}/comments`, createMentoringCommentDto);
    if (response.status !== 201) {
      throw new Error("Failed to create mentoring comment");
    }

    return response.data.result;
};

export const updateMentoringComment =
  async (matchingId: number, commentId: number, updateMentoringCommentDto: UpdateMentoringCommentDto): Promise<boolean> => {
    const response = await apiClient.put(`/api/v1/matching/${matchingId}/comments/${commentId}`, updateMentoringCommentDto);
    if (response.status !== 200) {
      throw new Error("Failed to update mentoring comment");
    }

    return response.data.result;
}

export const getMentoringCommentListByMatchingId =
  async (matchingId: number): Promise<MentoringCommentResponse[]> => {
    const response = await apiClient.get(`/api/v1/matching/${matchingId}/comments`);
    if (response.status !== 200) {
      throw new Error("Failed to get mentoring comment list");
    }

    return response.data.data;
}

export const deleteMentoringComment = async (matchingId: number, commentId: number): Promise<boolean> => {
  const response = await apiClient.delete(`/api/v1/matching/${matchingId}/comments/${commentId}`);

  return response.data.result;
}
