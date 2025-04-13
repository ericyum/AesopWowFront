import type { Comment } from "./comment";
import type {Pageable} from "./pageable";

export type BoardType = 'NOTICE' | 'FREE' | 'MATCHING';

export type CreateFreeBoardDto = {
  title: string;
  content: string;
  boardType: BoardType;
  userId: number;
};

export type FreeBoardResponseDto = {
  id: number;
  boardType: BoardType;
  title: string;
  content: string;
  userNickname: string;
  views: number;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
};

export type SearchType = 'title' | 'content' | 'all';

export type GetFreeBoardListResponseDto = Pageable<FreeBoardResponseDto>;
