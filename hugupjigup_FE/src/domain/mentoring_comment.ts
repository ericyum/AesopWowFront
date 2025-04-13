export type CreateMentoringCommentDto = {
  userId: number
  applicationQueueId: number
  content: string
  rate: number
}

export type UpdateMentoringCommentDto = {
  content: string
  rate: number
}

export type MentoringCommentResponse = {
  commentId: number
  content: string
  userNickname: string
  rate: number
  createdAt: string
}
