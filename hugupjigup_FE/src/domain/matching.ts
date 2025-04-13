import type {BoardType} from "../domain/free_board";
import type {Pageable} from "./pageable";

export type CreateAndUpdateMatchingDto = {
  title: string;
  content: string;
  boardType: BoardType;
  tag: string;
};

export type MatchingResponseDto = {
  matchingId: number;
  boardType: BoardType;
  matchingContent: string;
  matchingTitle: string;
  matchingViews: number;
  tag: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
};

export type MatchingListResponseDto = Pageable<MatchingResponseDto>;
