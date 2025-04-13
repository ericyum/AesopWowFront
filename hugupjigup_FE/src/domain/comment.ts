export type Comment = {
    id: number;
    content: string;
    userNickname: string;
    commentType: string;
}

export type CreateFreeCommentDto = {
  userId: number;
  commentType: CommentType;
  content: string;
}

export type CommentType = 'COMMENT' | 'MATCHINGCOMMENT';
