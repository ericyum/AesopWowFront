import type {CreateAndUpdateNoticeBoardDto, NoticeBoard, NoticeBoardListResponseDto} from "../domain/notice_board";
import apiClient from "../data/api_client";

/**
 * 백엔드 수정 필요 -> 백엔드 수정 이후 테스트 ㄱㄱ
 * 클라이언트에서 user token을 사용하고, 백엔드에서 user token을 이용해 user id를 찾아야 함
 */

export const createNoticeBoard =
  async (createNoticeBoardDto: CreateAndUpdateNoticeBoardDto): Promise<NoticeBoard> => {
    const response = await apiClient.post('/api/v1/notice/create', createNoticeBoardDto);
    if (response.status !== 201) {
      throw new Error("Failed to create notice board");
    }

    return response.data.data;
}

export const getNoticeBoardList = async (page: number=0, size: number=100, sort: string='updatedAt,desc'): Promise<NoticeBoardListResponseDto> => {
  const response = await apiClient.get('/api/v1/notice/posts',
    {
      params: { page, size, sort }
    });
  if (response.status !== 200) {
    throw new Error("Failed to get notice board list");
  }

  return response.data.data;
}

export const getNoticeBoardById = async (id: number): Promise<NoticeBoard> => {
  const response = await apiClient.get(`/api/v1/notice/get/${id}`);
  if (response.status !== 200) {
    throw new Error("Failed to get notice board");
  }

  return response.data.data;
}

export const getNoticeBoards = async (page: number=0, size: number=20): Promise<NoticeBoard[]> => {
  const response = await apiClient.get('/api/v1/notice/posts',
    {
      params: { page, size }
    }
  );
  if (response.status !== 200) {
    throw new Error("Failed to get notice boards");
  }

  return response.data.data;
}

export const deleteNoticeBoard = async (id: number): Promise<boolean> => {
  const response = await apiClient.delete(`/api/v1/notice/delete/${id}`);

  return response.data.result;
}

export const updateNoticeBoard = async (noticeId: number, updateNoticeBoardDto: CreateAndUpdateNoticeBoardDto):Promise<NoticeBoard> => {
  const response = await apiClient.put(`/api/v1/notice/update/${noticeId}`, updateNoticeBoardDto);
  if (response.status !== 200) {
    throw new Error("Failed to update notice board");
  }

  return response.data.data;
}
