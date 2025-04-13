import type {
  CreateFreeBoardDto,
  FreeBoardResponseDto,
  GetFreeBoardListResponseDto,
  SearchType
} from "../domain/free_board";
import apiClient from "../data/api_client";


export const createFreeBoard =
  async (createFreeBoardDto: CreateFreeBoardDto): Promise<FreeBoardResponseDto> => {
    const response = await apiClient.post('/api/v1/free', createFreeBoardDto);
    if (response.status !== 201) {
      throw new Error("Failed to create free board");
    }

    return response.data.data;
  };

export const getFreeBoardList =
  async (page: number=0, size: number=100, searchType: SearchType='all' ,keyword?: string, sort: string='updatedAt,desc'): Promise<GetFreeBoardListResponseDto> => {
    const response = await apiClient.get('/api/v1/free',
      {
        params: {
          page, size, searchType, keyword, sort
        }
      }
    );
    if (response.status !== 200) {
      throw new Error("Failed to get free board list");
    }

    return response.data.data;
}

export const getFreeBoardById = async (id: number): Promise<FreeBoardResponseDto> => {
  const response = await apiClient(`/api/v1/free/${id}`);
  if (response.status !== 200) {
    throw new Error("Failed to get free board");
  }

  return response.data.data;
}

export const updateFreeBoard = async (id: number, title: string, content: string): Promise<FreeBoardResponseDto> => {
  const response = await apiClient.put(`/api/v1/free/${id}`, { title, content });
  if (response.status !== 200) {
    throw new Error("Failed to update free board");
  }

  return response.data.data;
}

export const deleteFreeBoard = async (id: number): Promise<boolean> => {
  const response = await apiClient.delete(`/api/v1/free/${id}`);

  return response.data.result;
}
