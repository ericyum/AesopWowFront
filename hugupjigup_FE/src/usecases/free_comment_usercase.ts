import type {Comment, CreateFreeCommentDto} from "../domain/comment";
import apiClient from "../data/api_client";

export const createFreeComment =
  async (freeId: number, createCommentDto: CreateFreeCommentDto): Promise<Comment> => {
    const response = await apiClient.post(`/api/v1/free/${freeId}/comment`, createCommentDto);
    if (response.status !== 201) {
      throw new Error("Failed to create free comment");
    }

    return response.data.data;
}

export const updateFreeComment = async (freeId: number, commentId: number, content: string): Promise<Comment> => {
  const response = await apiClient.put(`/api/v1/free/${freeId}/comment/${commentId}`, { content });
  if (response.status !== 200) {
    throw new Error("Failed to update free comment");
  }

  return response.data.data;
}

export const deleteFreeComment = async (freeId: number, commentId: number): Promise<boolean> => {
  const response = await apiClient.delete(`/api/v1/free/${freeId}/comment/${commentId}`);

  return response.data.result;
}
